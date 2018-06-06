Google Sheets Simplifier
========================

```
const gsheetobj = require('gsheetobj')

const data = gsheetobj.fetch({
  id: '0L_596HdNVS_cYo_wG8WrwEaOwq5_mAsxliyVIqxZ3Tg',
  key: 'hIzaSyA8UfZselVWFFh63a9Ak_Tdml28WchWsGY',
})

```

You know all that Google API stuff? Awesome, right? Well this makes it
into what you really want, just some JavaScript objects you can use to
populate templates and use to build static sites with
[JAMstack](https://jamstack.org).

Algorithm
---------

The sheet meta data is first requested to imply the schema from the
collection, sheets, columns, and rows.

Schema
------

The sheet name is required and becomes the effective table name. This
means only one range per sheet.

A range is assumed to represent a collection of one-dimensional objects
always with headers as property names. The default return type for any
range is therefore a list of objects with properties. 

If the first row of the first column is blank then the first column is
assumed to be key name instead giving the object two dimensions of
values, the primary from the column header, and secondary from the first
column values.

Obviously headers and first-rows have to contain only unique values.

Names
-----

Names are kept as they are allowing developers to decide to use
long-hand indexing (with `[]`) or stick with dotted notation legal
names.

The `lower` and `nows` options can be set to lowercase the name and
remove white space.

Dates
-----

All dates are returned as strings they way they are formatted. Usually
these are going to be directly included in other output views. If
conversion is needed be sure to pick a format that can be easily parsed.

This keeps strings like `7-12` from being interpreted as dates even if
the field type of the spreadsheet column is not explicitly set. This
simply saves time for most practical applications, which is the point of
this module.

Data Preparation
----------------

Remove any rows or columns that are not being used to avoid blanks being
returned.

Limit the number of columns to the letters of the alphabet (27). This is
plenty and will encourage you to keep your data at least somewhat
normalized.

Hidden rows and columns are not hidden in the return. Data will have to
either be deleted from the sheet or filtered after the data is fetched
and returned by the caller.
