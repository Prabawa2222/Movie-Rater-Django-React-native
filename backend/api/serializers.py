from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Movie, Rating

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class MovieSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(write_only=True, required=False)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'no_of_ratings', 'avg_rating', 'image']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['image'] = instance.image 
        return representation

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'movie', 'user', 'stars']
