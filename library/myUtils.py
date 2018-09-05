import re
from django.template.defaultfilters import slugify


def unique_slugify(instance, value, slug_field_name='slug', queryset=None,
                   slug_separator='-'):
    """
    Calculates and stores a unique slug of ``value`` for an instance.

    ``slug_field_name`` should be a string matching the name of the field to
    store the slug in (and the field to check against for uniqueness).

    ``queryset`` usually doesn't need to be explicitly provided - it'll default
    to using the ``.all()`` queryset from the model's default manager.
    """
    slug_field = instance._meta.get_field(slug_field_name)

    slug = getattr(instance, slug_field.attname)
    slug_len = slug_field.max_length

    # Sort out the initial slug, limiting its length if necessary.
    slug = slugify(value)
    if slug_len:
        slug = slug[:slug_len]
    slug = _slug_strip(slug, slug_separator)
    original_slug = slug

    # Create the queryset if one wasn't explicitly provided and exclude the
    # current instance from the queryset.
    if queryset is None:
        queryset = instance.__class__._default_manager.all()
    if instance.pk:
        queryset = queryset.exclude(pk=instance.pk)

    # Find a unique slug. If one matches, at '-2' to the end and try again
    # (then '-3', etc).
    next = 2
    while not slug or queryset.filter(**{slug_field_name: slug}):
        slug = original_slug
        end = '%s%s' % (slug_separator, next)
        if slug_len and len(slug) + len(end) > slug_len:
            slug = slug[:slug_len-len(end)]
            slug = _slug_strip(slug, slug_separator)
        slug = '%s%s' % (slug, end)
        next += 1

    setattr(instance, slug_field.attname, slug)


def _slug_strip(value, separator='-'):
    """
    Cleans up a slug by removing slug separator characters that occur at the
    beginning or end of a slug.

    If an alternate separator is used, it will also replace any instances of
    the default '-' separator with the new separator.
    """
    separator = separator or ''
    if separator == '-' or not separator:
        re_sep = '-'
    else:
        re_sep = '(?:-|%s)' % re.escape(separator)
    # Remove multiple instances and if an alternate separator is provided,
    # replace the default '-' separator.
    if separator != re_sep:
        value = re.sub('%s+' % re_sep, separator, value)
    # Remove separator from the beginning and end of the slug.
    if separator:
        if separator != '-':
            re_sep = re.escape(separator)
        value = re.sub(r'^%s+|%s+$' % (re_sep, re_sep), '', value)
    return value
	
def extract_form_fields(soup):
	"Turn a BeautifulSoup form in to a dict of fields and default values"
	fields = {}
	for input in soup.findAll('input'):
		# ignore submit/image with no name attribute
		if input['type'] in ('submit', 'image') and not input.has_key('name'):
			continue
		
		# single element nome/value fields
		if input['type'] in ('text', 'hidden', 'password', 'submit', 'image', 'file', 'email'):
			value = ''
			if input.has_key('value'):
				value = input['value']
			fields[input['name']] = value
			continue
		
		# checkboxes and radios
		if input['type'] in ('checkbox', 'radio'):
			value = ''
			if input.has_key('checked'):
				if input.has_key('value'):
					value = input['value']
				else:
					value = 'on'
			if fields.has_key(input['name']) and value:
				fields[input['name']] = value
			
			if not fields.has_key(input['name']):
				fields[input['name']] = value
			
			continue
		
		assert False, 'input type %s not supported' % input['type']
	
	# textareas
	for textarea in soup.findAll('textarea'):
		fields[textarea['name']] = textarea.string or ''
	
	# select fields
	for select in soup.findAll('select'):
		value = ''
		options = select.findAll('option')
		is_multiple = select.has_key('multiple')
		selected_options = [
			option for option in options
			if option.has_key('selected')
		]
		
		# If no select options, go with the first one
		if not selected_options and options:
			selected_options = [options[0]]
		
		if not is_multiple:
			assert(len(selected_options) < 2)
			if len(selected_options) == 1:
				value = selected_options[0]['value']
		else:
			value = [option['value'] for option in selected_options]
		fields[select['name']] = value

	return fields


def file_sync(self, file_list):
    #initialize mega connection
    for ebook in file_list:
        path = ebook.url
        if ebook.localCache:
            ebook.localCache=True
            #copy files
            #if succesfull
                #return redirect to ebook.url  
            #else
                #set ebook.localCache = False 
                #return 503


