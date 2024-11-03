## One time setup
```
# Install the virtual environment
python -m venv .venv

# Activate the environment
source ./.venv/bin/activate

# Install the dependencies
pip install django djangorestframework

# Move to main project
cd video_recording

# Migrate the model to db  (i.e creating the table in database)
python manage.py makemigrations
python manage.py migrate
```

## To Run the server
```
python manage.py runserver
```

## API
```
# Home page
URL - http://127.0.0.1:8000/
Method - GET

# Recorded list
URL - http://127.0.0.1:8000/recordings/
Method - GET

# Specific Recorded video
URL - http://127.0.0.1:8000/playback/<Video Id>/
Method - GET
Ex: http://127.0.0.1:8000/playback/1/
```

