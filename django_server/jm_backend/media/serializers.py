from rest_framework import serializers
from media.models import MediaImage, Album


# Serializer for UploadedImage Model
# serializes pk and image

class MediaImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaImage
        fields = ('id', 'image', 'thumbnail', 'description', 'favorite', 'date_created', 'albums',)
        read_only_fields = ('thumbnail',)

class AlbumMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaImage
        fields = ('id', 'thumbnail', 'description', 'favorite')

class AlbumSerializer(serializers.ModelSerializer):
    photos = AlbumMediaSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = ('id', 'title', 'cover', 'priority', 'photos')
