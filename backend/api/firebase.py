import uuid
import firebase_admin
from firebase_admin import credentials, storage
from django.core.files.storage import default_storage


# Path to your Firebase service account key file
cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'movie-rater-84bb2.appspot.com'
})

bucket = storage.bucket()

def upload_image_firebase(file):
    filename = str(uuid.uuid4()) + file.name
    temp_file = default_storage.save(filename, file)
    blob = bucket.blob(filename)
    blob.upload_from_filename(temp_file)
    blob.make_public()
    url = blob.public_url
    default_storage.delete(filename)

    return url