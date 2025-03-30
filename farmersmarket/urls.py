from django.urls import path
from . import views  # Local views import
from django.contrib import admin


urlpatterns = [
    # Root URL (homepage)
    path('', views.index, name='index'),  # Maps the root URL to the index view


    # Other URL patterns
    path('buyer-central.html', views.buyercentral, name='buyercentral'),
    path('fruits.html', views.fruits, name='fruits'),
    path('artificial plants.html', views.artificialplants, name='artificialplants'),  # Changed space to hyphen
    path('vegetables.html', views.vegetables, name='vegetables'),
    path('grocery.html', views.grocery, name='grocery'),
    path('products.html', views.products, name='products'),
    path('login.html', views.login, name='login'),  # Updated to use signup.html
    path('signup.html', views.signup, name='signup'),
    path('process-order/', views.process_order, name='process_order'),
    path('buynow.html', views.buynow, name='buynow'),
    path('orders.html', views.orders, name='orders'),
    path('order management.html', views.ordermanagement, name='orders management'),
    path('admin-dashboard.html', views.admindashboard, name='admin dashboard'),
    path('profile.html', views.profile, name='profile'),  # Updated to use signup.html
    path('admin-login.html', views.adminlogin, name='adminlogin'),  # Updated to use signup.html
    path('about.html', views.about, name='about'), 
    path('images.html', views.images, name='images'),  # Updated to use signup.html
    path('videos.html', views.videos, name='videos'),  # Updated to use signup.html
    path('ideas.html', views.ideas, name='ideas'),  # Updated to use signup.html
]

