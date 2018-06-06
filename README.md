Google Sheets Simplifier
========================

```
const gsobj = require('gsheetobj')

const data = gsobj.fetch({
  spreadsheetId: '0L_596HdNVS_cYo_wG8WrwEaOwq5_mAsxliyVIqxZ3Tg',
  key: 'hIzaSyA8UfZselVWFFh63a9Ak_Tdml28WchWsGY',
}).then( ... )

const data = gsobj.save({ ... }).then( ... )

const data = gsobj.fetchMeta({ ... }).then( ... )

const data = gsobj.fetchTable({ ... },'mysheet').then( ... )

```

You know all that Google API stuff? Awesome, right? Well this makes it
into what you really want, JavaScript objects implied from the sheet
itself. 

Created initially to pull down the data in a friendlier (albeit larger)
way for populating Mustache templates in custom static, serverless
[JAMstack](https://jamstack.org) site generation using only Gulp (which
is much simpler than setting up GraphQL as Gatsby requires). In fact,
you can just include the `data.json` in your static site as a poor-man's
read API for simple, smaller data-driven web sites.

Algorithm
---------

The sheet meta data is first requested to get the list of tables/sheets
and the `timeZone`. This can be done explicitly by calling
`fetchMeta(params)`.

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

The only reserved name is the spreadsheet/table name `meta` which is
used to contain information about all of the parsed data as detected.
Just do not name any individual sheet in your spreadsheet `meta` and you
are good.

Dates
-----

By default all dates are returned as strings they way they are
formatted. Usually these are going to be directly included in other
output views. If conversion is needed be sure to pick a format that can
be easily parsed.

This keeps strings like `7-12` from being interpreted as dates even if
the field type of the spreadsheet column is not explicitly set. This
simply saves time for most practical applications, which is the point of
this module.

Data Preparation Suggestions
----------------------------

Remove any rows or columns that are not being used to avoid blanks being
returned.

Although you can have as many columns as Google allows, you should limit
the number of columns to the letters of the alphabet (27). This is
plenty and will encourage you to keep your data at least somewhat
normalized.

Hidden rows and columns are not hidden. Data will have to either be
deleted from the sheet or filtered after the data is fetched and
returned by the caller. This encourages you to create an aging data
strategy.

Testing
-------

Since this requires setting up a Google Sheets spreadsheet with an API
key testing has been commented out by default but left in to
demonstrate. (If you have a good suggestions on how that could be
automated without blowing up the quota let me know.)
