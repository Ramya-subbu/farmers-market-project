from pathlib import Path
import os
from dotenv import load_dotenv  # For loading environment variables securely

# Load environment variables
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Secret key should be retrieved from an environment variable in production
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'your-default-secret-key-here')  # Load from .env

# Set to False in production
DEBUG = os.getenv('DJANGO_DEBUG', 'True') == 'True'

# Configure ALLOWED_HOSTS (for production, update with your domain or IP)
ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    'sslserver',  # Optional: can remove this for production
    'farmersmarket',
]


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'farmersmarket.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates'),],
        'APP_DIRS': True,  # This allows Django to look for templates in each app's "templates" folder
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'farmersmarket.wsgi.application'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}


# Database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    },
}



# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'

# Add the following line to tell Django where to find the static files for your app
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]  # Ensure the folder exists

# Optional: Where to collect static files in production
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')  # Optional, for production use

# Set up security settings for production (this is important for a live environment)
# If you're using SSL in production
SECURE_SSL_REDIRECT = os.getenv('DJANGO_SECURE_SSL_REDIRECT', 'True') == 'True'

# Optional: for security, consider these settings for production
SECURE_HSTS_SECONDS = 31536000  # Enforce HTTPS for 1 year (in production)
SECURE_HSTS_INCLUDE_SUBDOMAINS = True  # Apply HSTS to subdomains
SECURE_HSTS_PRELOAD = True  # Allow the domain to be included in browser preload lists
SECURE_CONTENT_TYPE_NOSNIFF = True  # Prevent browsers from interpreting files as a different MIME type

# Set default auto field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
LOGIN_REDIRECT_URL = 'profile'  # Redirect to profile page after login
