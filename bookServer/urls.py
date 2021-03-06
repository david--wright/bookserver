from django.conf.urls import patterns, include, url
from django.http import HttpResponseRedirect
from django.conf import settings
from django.conf.urls.static import static

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'bookServer.views.home', name='home'),
    # url(r'^bookServer/', include('bookServer.foo.urls')),
    url(r'^shelves/', include('library.urls',namespace="library")),
    url(r'^o2/', include('oaut_auth.urls', namespace="oauth2")),
    url(r'^$', lambda x: HttpResponseRedirect('/shelves/')),
    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url('^accounts/', include('registration.urls'))
)

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



