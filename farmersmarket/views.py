from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Product, Order
from django.shortcuts import render, redirect
from .models import Product
import json

def index(request):
    return render(request, 'index.html')

def buyercentral(request):
    return render(request, 'buyer-central.html')

def products(request):
    return render(request, 'products.html')

def fruits(request):
    return render(request, 'fruits.html')

def vegetables(request):
    return render(request, 'vegetables.html')

def grocery(request):
    return render(request, 'grocery.html')

def artificialplants(request):
    return render(request, 'artificial plants.html')

def buynow(request):
    return render(request, 'buynow.html')

def login(request):
    return render(request, 'login.html')

def signup(request):
    return render(request, 'signup.html')

def process_order(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        product_data = data['product']
        
        # Create order record
        try:
            product = Product.objects.get(id=product_data['id'])
            total_amount = product.price * product_data['quantity']
            
            # Create the order in the database
            order = Order.objects.create(
                user_name=data['name'],
                user_address=data['address'],
                user_phone=data['phone'],
                product=product,
                quantity=product_data['quantity'],
                total_amount=total_amount,
                payment_mode='COD',  # Default to COD (Cash on Delivery)
            )
            return JsonResponse({'success': True, 'order_id': order.id})

        except Product.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Product not found'})

    return JsonResponse({'success': False, 'error': 'Invalid request method'})

def orders(request):
    return render(request,'orders.html')

def ordermanagement(request):
    return render(request,'order management.html')

def admindashboard(request):
    return render(request,'admin-dashboard.html')

def profile(request):
    return render(request,'profile.html')

def adminlogin(request):
    return render(request,'admin-login.html')

def about(request):
    return render(request,'about.html')

def images(request):
    return render(request,'images.html')

def videos(request):
    return render(request,'videos.html')

def ideas(request):
    return render(request,'ideas.html')

