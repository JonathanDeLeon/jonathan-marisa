from rest_framework import serializers
from media.models import MediaImage, Album


# Serializer for UploadedImage Model
# serializes pk and image

class MediaImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaImage
        fields = ('pk', 'image', 'thumbnail', 'description', 'favorite', 'date_created',)
        read_only_fields = ('thumbnail',)


class AlbumSerializer(serializers.ModelSerializer):
    photos = MediaImageSerializer(many=True, read_only=True)
    class Meta:
        model = Album
        fields = ('pk', 'title', 'photos')


