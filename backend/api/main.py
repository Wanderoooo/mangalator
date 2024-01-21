from fastapi import FastAPI, HTTPException, Request
import base64
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import jwt

app = FastAPI()
counter = 1
key = "nwhacks" # put in .env file
# create folder if does not exist

db = None

def get_database():
    global db

    # Check if the database is already initialized
    if db is None:
        CONNECTION_STRING = "mongodb+srv://nwhacks:nwhacks2024@cluster0.r4ciglc.mongodb.net/" # Replace with your actual connection string
        client = MongoClient(CONNECTION_STRING)
        db = client.mangalator
        
    return db


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
  
# payload: {"key": unique string user key}
@app.post("/signup")
async def signup(request: Request):
    get_database()
    try:
        payload = await request.json()
        collection = db.users
        collection.insert_one({"key": payload["key"]})
        return {"signup success"}
    except Exception as e:
        raise HTTPException(status_code=404, detail="user key signup failed")


# @app.post("/login")
# async def login(request: Request):
#     get_database()
#     try:
#         payload = await request.json()
#         collection = db.mangas
#         collection.find({"key": payload["key"]})
#         return {"login success"}
#     except Exception as e:
#         return {"find failed!"}

# payload: {"key": unique string user key, "image": base64, "name": manga collection name}
# return: {"key", "image": image path, "name"?}
@app.post("/add")
async def add(request: Request):
    get_database()
    try:
        payload = await request.json()
        collection = db.mangas
        images = payload["image"]
        translatedImages = await hanson
        for image in translatedImages:
            collection.insert_one({"key": payload["key"], "image": image, "name": payload["name"]})
        return {"translatedBase64s": translatedImages}
    except Exception as e:
        raise HTTPException(status_code=404, detail="image translate failed")

# payload: {"key", "name"}
# return: [{"image": path}]
@app.post("/display") # display 1 collection of manga
async def display(request: Request):
    get_database()
    try:
        payload = await request.json()
        collection = db.mangas
        pages = collection.find({"key": payload["key"], "name": payload["name"]})
        return {"pages": pages}
    except Exception as e:
        raise HTTPException(status_code=404, detail="pages display failed")

# payload: {"key": unique string user key}
# return: [{"name": manga name, "image": thumbnail path}]
@app.get("/dashboard")
async def dashboard(request: Request):
    get_database()
    dashboardArray = []
    try:
        payload = await request.json()
        collection = db.mangas
        names = collection.find({"key": payload["key"]}).distinct("name")
        for name in names:
            thumbnail = collection.find({"name": name}).sort([("_id", -1)]).limit(1)
            imagePath = thumbnail.get("image")
            dashboardArray.append({"name":name, "image": imagePath})
        return dashboardArray
    except Exception as e:
        raise HTTPException(status_code=404, detail="dashboard render failed")
            

@app.post("/removeone")
async def removeone(request: Request):
    get_database()
    try:
        payload = await request.json()
        collection = db.mangas
        collection.delete_one({"key": payload["key"], "image": payload["image"]})
        return {"manga removed successfully"}
    except Exception as e:
        raise HTTPException(status_code=404, detail="manga (1) delete failed")

@app.post("/remove")
async def remove(request: Request):
    get_database()
    try:
        payload = await request.json()
        collection = db.mangas
        collection.delete_many({"key": payload["key"], "name": payload["name"]})
        return {"manga collection removed successfully"}
    except Exception as e:
        raise HTTPException(status_code=404, detail="remove manga collection failed")

@app.get("/")
async def root():
    return {"message": "!!! root"}


# @app.post("/input/{image_binary}")
# async def input(image_binary):
#     imgData = base64.b64decode(image_binary)
#     fileName = f"C:/Users/Alissa Guo/Desktop/mangalator/backend/image/image_{counter}.jpg" # change username
#     with open(fileName, 'wb') as f:
#         f.write(imgData)
    
#     counter+=1
    
    
#     return {"image path": image_binary}
