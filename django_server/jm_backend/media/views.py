# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# Create your views here.
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from media.models import MediaImage, Album
from media.pagination import LinkHeaderPagination, CustomPagination
from media.serializers import MediaImageSerializer, AlbumSerializer


class MediaImagesViewSet(viewsets.ModelViewSet):
    queryset = MediaImage.objects.all()
    serializer_class = MediaImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('uuid', 'favorite', 'albums')
    pagination_class = LinkHeaderPagination
    # pagination_class = CustomPagination


    def perform_create(self, serializer):
        serializer.save()
        for img in self.request.data.getlist('image'):
            if img != serializer.validated_data['image']:
                MediaImage.objects.create(image=img)

    @action(detail=False)
    def not_in(self, request):
        album_id = request.GET.get('album_id')
        if album_id is not None:
            images = self.get_queryset().exclude(albums__pk=album_id)
            serializer = MediaImageSerializer(images, many=True, context={'request': self.request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'Request params not set'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['put', 'patch'], parser_classes=(JSONParser,))
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
    parser_classes = (JSONParser,)
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('title', 'priority')
    ordering = ('priority',)

    def list(self, request):
        albums = self.filter_queryset(self.get_queryset().values('id', 'title', 'cover', 'priority'))
        return Response(albums, status=status.HTTP_200_OK)

    @action(detail=True, methods=['put', 'patch'])
    def add_images(self, request):
        album = self.get_object()
        for img in request.data:
            album.photos.add(img)
        serializer = self.get_serializer(album)
        return Response(serializer.data)
