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
http://127.0.0.1:8000/

# Recorded list
http://127.0.0.1:8000/recordings/

# Specific Recorded video
http://127.0.0.1:8000/playback/<Video Id>/
Ex: http://127.0.0.1:8000/playback/1/
```

