
# type-utils v1.0.0 [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

A library of type-related functions.

#### `getType(value: Any) -> Function`

Get the type of the `value`.

```coffee
getType []    # => Array
getType {}    # => Object
getType 0     # => Number
getType null  # => Void
```

#### `setType(value: Any, type: Function) -> Any`

Set the type of the `value`.

```coffee
obj = {}
getType obj  # => Object
setType obj, Function
getType obj  # => Function
```

#### `isType(value: Any, type: [ Function, ArrayOf(Function) ]) -> Boolean`

Returns `true` when the `value` is one of the given types.

```coffee
isType 0, Number              # => true
isType 0, Boolean             # => false
isType 0, [ Number, Boolean ] # => true
```

#### `getKind(type: Function) -> Function`

Get the first type inherited by `type`.

```coffee
getKind Function  # => Object
getKind Object    # => null
getKind null      # => null
```

#### `getKinds(type: Function) -> ArrayOf(Function)`

Get every type inherited by `type`.

```coffee
getKinds Function  # => [ Function, Object ]
getKinds null      # => [ null ]
```

#### `isKind(value: Any, type: Function) -> Boolean`

Returns `true` when the `value` inherits from the given type.

```coffee
isKind {}, Object  # => true
isKind [], Object  # => true
isKind 0, Number   # => false
```

## Constructors

#### Validator

*Documentation coming soon*

#### Kind

*Documentation coming soon*

#### OneOf

*Documentation coming soon*

#### ArrayOf

*Documentation coming soon*

#### Shape

*Documentation coming soon*

#### Nan

*Documentation coming soon*

#### Void

*Documentation coming soon*

#### Any

*Documentation coming soon*

## Assertions

#### `assert(flag: Boolean, reason: String) -> Void`

Throws an `Error` if the `flag` equals `false`.

#### `assertType(value: Any, type: [ Function, ArrayOf(Function) ]) -> Void`

Throws a `TypeError` if `isType(value, type)` equals `false`.

#### `assertReturnType(value: Any, type: [ Function, ArrayOf(Function) ]) -> Void`

Same as `assertType`, except the error message is customized to treat `value` as the return value of a function.

#### `assertKind(value: Any, type: Function) -> Void`

Throws a `TypeError` if `isKind(value, type)` equals `false`.

#### `validateTypes(values: Object, types: Object) -> Void`

Calls `assertType` for each key in `types`.

```coffee
values =
  obj: {}
  arr: null

validateTypes values,
  obj: Object
  arr: [ Array, Void ]
```
