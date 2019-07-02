# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class Home(Component):
    """A Home component.
Homepage

Keyword arguments:
- game (dict; optional): The game info that will be displayed"""
    @_explicitize_args
    def __init__(self, game=Component.UNDEFINED, **kwargs):
        self._prop_names = ['game']
        self._type = 'Home'
        self._namespace = 'my_dash_component'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['game']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(Home, self).__init__(**args)
