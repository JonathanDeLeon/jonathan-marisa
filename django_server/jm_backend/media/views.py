# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# Create your views here.

from rest_framework import viewsets, status, filters
from rest_framework.decorators import detail_route, list_route
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from media.models import MediaImage, Album
from media.serializers import MediaImageSerializer, AlbumSerializer


class MediaImagesViewSet(viewsets.ModelViewSet):
    queryset = MediaImage.objects.all()
    serializer_class = MediaImageSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save()
        for img in self.request.data.getlist('image'):
            if img != serializer.validated_data['image']:
                MediaImage.objects.create(image=img)

    @list_route()
    def not_in(self, request):
        album_id = request.GET.get('album_id')
        if album_id is not None:
            images = self.get_queryset().exclude(albums__pk=album_id)
            serializer = MediaImageSerializer(images, many=True, context={'request': self.request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'Request params not set'}, status=status.HTTP_400_BAD_REQUEST)

    @detail_route(methods=['put', 'patch'], parser_classes=(JSONParser,))
    def add_album(self, request, pk=None):
        media = self.get_object()
        if 'albums' in request.data:
            albums = request.data['albums']
            bulk = isinstance(albums, list)
            if bulk:
                media.albums.set(albums)
            else:
                try:
                    album = Album.objects.get(pk=albums)
                    if album not in media.albums.all():
                        media.albums.add(album.id)
                except Album.DoesNotExist:
                    return Response({'status': 'Albums parameter is invalid'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'status': 'Album has been added'})
        return Response({'status': 'Request does not have albums parameter'}, status=status.HTTP_400_BAD_REQUEST)


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('title', 'priority')
    ordering = ('priority',)

# TODO: Return only photo.pk and photo.thumbnail
# TODO: pk -> id in the DB
    # def list(self, request):
    #     albums = self.filter_queryset(self.get_queryset()).values('pk', 'title', 'cover', 'priority', 'photos')
    #     return Response(albums, status=status.HTTP_200_OK)

    @detail_route(methods=['put', 'patch'], parser_classes=(JSONParser,))
    def add_images(self, request, pk=None):
        album = self.get_object()
        if 'images' in request.data:
            images = request.data['images']
            bulk = isinstance(images, list)
            if bulk:
                for img in images:
                    album.photos.add(img)
            else:
                album.photos.add(images)
            return Response({'status': 'Photos have been added to album'})
        return Response({'status': 'Request does not have images parameter'}, status=status.HTTP_400_BAD_REQUEST)
