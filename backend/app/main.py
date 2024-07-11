from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import Task, TaskModel
from .database import SessionLocal, init_db

init_db()

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this as necessary to specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
@app.post("/add/")
def add(task: TaskModel):
    db = SessionLocal()
    
    db_task = Task(task=task.task)
    db.add(db_task)
    
    db.commit()
    db.refresh(db_task)
    db.close()
    
    return {"message": "Tarefa adicionada!", "id": db_task.id}

@app.delete("/del/{task_id}")
def delete_task(task_id: int):
    db = SessionLocal()
    db_task = db.query(Task).filter(Task.id == task_id).first()
    
    if db_task is None:
        db.close()
        raise HTTPException(status_code=404, detail="Tarefa não encontrada!")
    
    db.delete(db_task)
    db.commit()
    db.close()
    
    return {"message": "Tarefa deletada!"}

@app.get("/get/")
def get_tasks():
    db = SessionLocal()
    tasks = db.query(Task).all()
    db.close()
    return {"tasks": [{"id": task.id, "tarefa": task.task} for task in tasks]}