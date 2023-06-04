from rest_framework import permissions


class IsAuthorOf(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return request.user == obj.author
    
class IsOwnerOfAccount(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return request.user == obj