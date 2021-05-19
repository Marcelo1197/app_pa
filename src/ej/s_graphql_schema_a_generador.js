//INFO: generar consultas a partir del esquema que devuelve graphene

SCHEMA= { "data": { "__schema": {
		"queryType": {
			"name": "Consultas"
		},
		"mutationType": {
			"name": "Modificaciones"
		},
		"subscriptionType": null,
		"types": [
			{
				"kind": "OBJECT",
				"name": "Consultas",
				"description": null,
				"fields": [
					{
						"name": "hola",
						"description": "Devuelve \"PodemosAprender\"",
						"args": [],
						"type": {
							"kind": "SCALAR",
							"name": "String",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "texto",
						"description": "The ID of the object",
						"args": [
							{
								"name": "id",
								"description": null,
								"type": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "ID",
										"ofType": null
									}
								},
								"defaultValue": null
							}
						],
						"type": {
							"kind": "OBJECT",
							"name": "TextoNode",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "textoLista",
						"description": null,
						"args": [
							{
								"name": "orderBy",
								"description": null,
								"type": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "String",
										"ofType": null
									}
								},
								"defaultValue": null
							},
							{
								"name": "offset",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "before",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "after",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "first",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "last",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "fhCreado_Gt",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "DateTime",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "fhCreado_Lt",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "DateTime",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "fhEditado_Gt",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "DateTime",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "fhEditado_Lt",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "DateTime",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "deQuien_Username",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "enCharla",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							}
						],
						"type": {
							"kind": "OBJECT",
							"name": "TextoNodeConnection",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "charla",
						"description": "The ID of the object",
						"args": [
							{
								"name": "id",
								"description": null,
								"type": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "ID",
										"ofType": null
									}
								},
								"defaultValue": null
							}
						],
						"type": {
							"kind": "OBJECT",
							"name": "CharlaNode",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "charlaLista",
						"description": null,
						"args": [
							{
								"name": "orderBy",
								"description": null,
								"type": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "String",
										"ofType": null
									}
								},
								"defaultValue": null
							},
							{
								"name": "offset",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "before",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "after",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "first",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "last",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "deQuien_Username",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "fhCreado_Gt",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "DateTime",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "fhCreado_Lt",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "DateTime",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "titulo_Icontains",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							}
						],
						"type": {
							"kind": "OBJECT",
							"name": "CharlaNodeConnection",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "charlaitem",
						"description": "The ID of the object",
						"args": [
							{
								"name": "id",
								"description": null,
								"type": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "ID",
										"ofType": null
									}
								},
								"defaultValue": null
							}
						],
						"type": {
							"kind": "OBJECT",
							"name": "CharlaItemNode",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "charlaitemLista",
						"description": null,
						"args": [
							{
								"name": "orderBy",
								"description": null,
								"type": {
									"kind": "LIST",
									"name": null,
									"ofType": {
										"kind": "SCALAR",
										"name": "String",
										"ofType": null
									}
								},
								"defaultValue": null
							},
							{
								"name": "offset",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "before",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "after",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "first",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "last",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "textoId",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "ID",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "charlaId",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "ID",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "charla_Titulo",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "charla_Titulo_Icontains",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							}
						],
						"type": {
							"kind": "OBJECT",
							"name": "CharlaItemNodeConnection",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					}
				],
				"inputFields": null,
				"interfaces": [],
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "SCALAR",
				"name": "String",
				"description": "The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.",
				"fields": null,
				"inputFields": null,
				"interfaces": null,
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "OBJECT",
				"name": "TextoNode",
				"description": null,
				"fields": [
					{
						"name": "id",
						"description": "The ID of the object.",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "ID",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "deQuien",
						"description": "",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "OBJECT",
								"name": "UserNode",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "fhCreado",
						"description": "",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "DateTime",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "fhEditado",
						"description": "",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "DateTime",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "titulo",
						"description": "",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "texto",
						"description": "",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "charlaSet",
						"description": "",
						"args": [
							{
								"name": "offset",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "before",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "after",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "first",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "last",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "deQuien_Username",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "fhCreado_Gt",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "DateTime",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "fhCreado_Lt",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "DateTime",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "titulo_Icontains",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							}
						],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "OBJECT",
								"name": "CharlaNodeConnection",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "charlaitemSet",
						"description": "",
						"args": [
							{
								"name": "offset",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "before",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "after",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "first",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "last",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "textoId",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "ID",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "charlaId",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "ID",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "charla_Titulo",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "charla_Titulo_Icontains",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							}
						],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "OBJECT",
								"name": "CharlaItemNodeConnection",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					}
				],
				"inputFields": null,
				"interfaces": [
					{
						"kind": "INTERFACE",
						"name": "Node",
						"ofType": null
					}
				],
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "INTERFACE",
				"name": "Node",
				"description": "An object with an ID",
				"fields": [
					{
						"name": "id",
						"description": "The ID of the object.",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "ID",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					}
				],
				"inputFields": null,
				"interfaces": null,
				"enumValues": null,
				"possibleTypes": [
					{
						"kind": "OBJECT",
						"name": "TextoNode",
						"ofType": null
					},
					{
						"kind": "OBJECT",
						"name": "CharlaNode",
						"ofType": null
					},
					{
						"kind": "OBJECT",
						"name": "CharlaItemNode",
						"ofType": null
					}
				]
			},
			{
				"kind": "SCALAR",
				"name": "ID",
				"description": "The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `\"4\"`) or integer (such as `4`) input value will be accepted as an ID.",
				"fields": null,
				"inputFields": null,
				"interfaces": null,
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "OBJECT",
				"name": "UserNode",
				"description": null,
				"fields": [
					{
						"name": "id",
						"description": "",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "ID",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "username",
						"description": "Requerido. 150 carácteres como máximo. Únicamente letras, dígitos y @/./+/-/_ ",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					}
				],
				"inputFields": null,
				"interfaces": [],
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "SCALAR",
				"name": "DateTime",
				"description": "The `DateTime` scalar type represents a DateTime\nvalue as specified by\n[iso8601](https://en.wikipedia.org/wiki/ISO_8601).",
				"fields": null,
				"inputFields": null,
				"interfaces": null,
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "OBJECT",
				"name": "CharlaNodeConnection",
				"description": null,
				"fields": [
					{
						"name": "pageInfo",
						"description": "Pagination data for this connection.",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "OBJECT",
								"name": "PageInfo",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "edges",
						"description": "Contains the nodes in this connection.",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "OBJECT",
									"name": "CharlaNodeEdge",
									"ofType": null
								}
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					}
				],
				"inputFields": null,
				"interfaces": [],
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "OBJECT",
				"name": "PageInfo",
				"description": "The Relay compliant `PageInfo` type, containing data necessary to paginate this connection.",
				"fields": [
					{
						"name": "hasNextPage",
						"description": "When paginating forwards, are there more items?",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "Boolean",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "hasPreviousPage",
						"description": "When paginating backwards, are there more items?",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "Boolean",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "startCursor",
						"description": "When paginating backwards, the cursor to continue.",
						"args": [],
						"type": {
							"kind": "SCALAR",
							"name": "String",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "endCursor",
						"description": "When paginating forwards, the cursor to continue.",
						"args": [],
						"type": {
							"kind": "SCALAR",
							"name": "String",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					}
				],
				"inputFields": null,
				"interfaces": [],
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "SCALAR",
				"name": "Boolean",
				"description": "The `Boolean` scalar type represents `true` or `false`.",
				"fields": null,
				"inputFields": null,
				"interfaces": null,
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "OBJECT",
				"name": "CharlaNodeEdge",
				"description": "A Relay edge containing a `CharlaNode` and its cursor.",
				"fields": [
					{
						"name": "node",
						"description": "The item at the end of the edge",
						"args": [],
						"type": {
							"kind": "OBJECT",
							"name": "CharlaNode",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "cursor",
						"description": "A cursor for use in pagination",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					}
				],
				"inputFields": null,
				"interfaces": [],
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "OBJECT",
				"name": "CharlaNode",
				"description": null,
				"fields": [
					{
						"name": "id",
						"description": "The ID of the object.",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "ID",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "deQuien",
						"description": "",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "OBJECT",
								"name": "UserNode",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "fhCreado",
						"description": "",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "DateTime",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "titulo",
						"description": "",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "textos",
						"description": "",
						"args": [
							{
								"name": "offset",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "before",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "after",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "first",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "last",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							}
						],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "OBJECT",
								"name": "TextoNodeConnection",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "charlaitemSet",
						"description": "",
						"args": [
							{
								"name": "offset",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "before",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "after",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "first",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "last",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Int",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "textoId",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "ID",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "charlaId",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "ID",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "charla_Titulo",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							},
							{
								"name": "charla_Titulo_Icontains",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "String",
									"ofType": null
								},
								"defaultValue": null
							}
						],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "OBJECT",
								"name": "CharlaItemNodeConnection",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					}
				],
				"inputFields": null,
				"interfaces": [
					{
						"kind": "INTERFACE",
						"name": "Node",
						"ofType": null
					}
				],
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "OBJECT",
				"name": "TextoNodeConnection",
				"description": null,
				"fields": [
					{
						"name": "pageInfo",
						"description": "Pagination data for this connection.",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "OBJECT",
								"name": "PageInfo",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "edges",
						"description": "Contains the nodes in this connection.",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "OBJECT",
									"name": "TextoNodeEdge",
									"ofType": null
								}
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					}
				],
				"inputFields": null,
				"interfaces": [],
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "OBJECT",
				"name": "TextoNodeEdge",
				"description": "A Relay edge containing a `TextoNode` and its cursor.",
				"fields": [
					{
						"name": "node",
						"description": "The item at the end of the edge",
						"args": [],
						"type": {
							"kind": "OBJECT",
							"name": "TextoNode",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "cursor",
						"description": "A cursor for use in pagination",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					}
				],
				"inputFields": null,
				"interfaces": [],
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "SCALAR",
				"name": "Int",
				"description": "The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31 - 1) and 2^31 - 1 since represented in JSON as double-precision floating point numbers specifiedby [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point).",
				"fields": null,
				"inputFields": null,
				"interfaces": null,
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "OBJECT",
				"name": "CharlaItemNodeConnection",
				"description": null,
				"fields": [
					{
						"name": "pageInfo",
						"description": "Pagination data for this connection.",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "OBJECT",
								"name": "PageInfo",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "edges",
						"description": "Contains the nodes in this connection.",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "OBJECT",
									"name": "CharlaItemNodeEdge",
									"ofType": null
								}
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					}
				],
				"inputFields": null,
				"interfaces": [],
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "OBJECT",
				"name": "CharlaItemNodeEdge",
				"description": "A Relay edge containing a `CharlaItemNode` and its cursor.",
				"fields": [
					{
						"name": "node",
						"description": "The item at the end of the edge",
						"args": [],
						"type": {
							"kind": "OBJECT",
							"name": "CharlaItemNode",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "cursor",
						"description": "A cursor for use in pagination",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					}
				],
				"inputFields": null,
				"interfaces": [],
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "OBJECT",
				"name": "CharlaItemNode",
				"description": null,
				"fields": [
					{
						"name": "id",
						"description": "The ID of the object.",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "ID",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "charla",
						"description": "",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "OBJECT",
								"name": "CharlaNode",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "texto",
						"description": "",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "OBJECT",
								"name": "TextoNode",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "orden",
						"description": "",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "nivel",
						"description": "",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "Int",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					}
				],
				"inputFields": null,
				"interfaces": [
					{
						"kind": "INTERFACE",
						"name": "Node",
						"ofType": null
					}
				],
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "OBJECT",
				"name": "Modificaciones",
				"description": null,
				"fields": [
					{
						"name": "textoModificar",
						"description": null,
						"args": [
							{
								"name": "input",
								"description": null,
								"type": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "INPUT_OBJECT",
										"name": "TextoModificarInput",
										"ofType": null
									}
								},
								"defaultValue": null
							}
						],
						"type": {
							"kind": "OBJECT",
							"name": "TextoModificarPayload",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "charlaitemCrear",
						"description": null,
						"args": [
							{
								"name": "input",
								"description": null,
								"type": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "INPUT_OBJECT",
										"name": "CharlaItemModificarInput",
										"ofType": null
									}
								},
								"defaultValue": null
							}
						],
						"type": {
							"kind": "OBJECT",
							"name": "CharlaItemModificarPayload",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					}
				],
				"inputFields": null,
				"interfaces": [],
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "OBJECT",
				"name": "TextoModificarPayload",
				"description": null,
				"fields": [
					{
						"name": "texto",
						"description": null,
						"args": [],
						"type": {
							"kind": "OBJECT",
							"name": "TextoNode",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "clientMutationId",
						"description": null,
						"args": [],
						"type": {
							"kind": "SCALAR",
							"name": "String",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					}
				],
				"inputFields": null,
				"interfaces": [],
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "INPUT_OBJECT",
				"name": "TextoModificarInput",
				"description": null,
				"fields": null,
				"inputFields": [
					{
						"name": "texto",
						"description": null,
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							}
						},
						"defaultValue": null
					},
					{
						"name": "id",
						"description": null,
						"type": {
							"kind": "SCALAR",
							"name": "ID",
							"ofType": null
						},
						"defaultValue": null
					},
					{
						"name": "charlaTitulo",
						"description": null,
						"type": {
							"kind": "SCALAR",
							"name": "String",
							"ofType": null
						},
						"defaultValue": null
					},
					{
						"name": "orden",
						"description": null,
						"type": {
							"kind": "SCALAR",
							"name": "String",
							"ofType": null
						},
						"defaultValue": null
					},
					{
						"name": "clientMutationId",
						"description": null,
						"type": {
							"kind": "SCALAR",
							"name": "String",
							"ofType": null
						},
						"defaultValue": null
					}
				],
				"interfaces": null,
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "OBJECT",
				"name": "CharlaItemModificarPayload",
				"description": null,
				"fields": [
					{
						"name": "charlaitem",
						"description": null,
						"args": [],
						"type": {
							"kind": "OBJECT",
							"name": "CharlaItemNode",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "clientMutationId",
						"description": null,
						"args": [],
						"type": {
							"kind": "SCALAR",
							"name": "String",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					}
				],
				"inputFields": null,
				"interfaces": [],
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "INPUT_OBJECT",
				"name": "CharlaItemModificarInput",
				"description": null,
				"fields": null,
				"inputFields": [
					{
						"name": "textoId",
						"description": null,
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "ID",
								"ofType": null
							}
						},
						"defaultValue": null
					},
					{
						"name": "charlaTitulo",
						"description": null,
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "SCALAR",
								"name": "String",
								"ofType": null
							}
						},
						"defaultValue": null
					},
					{
						"name": "orden",
						"description": null,
						"type": {
							"kind": "SCALAR",
							"name": "String",
							"ofType": null
						},
						"defaultValue": null
					},
					{
						"name": "clientMutationId",
						"description": null,
						"type": {
							"kind": "SCALAR",
							"name": "String",
							"ofType": null
						},
						"defaultValue": null
					}
				],
				"interfaces": null,
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "OBJECT",
				"name": "__Schema",
				"description": "A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation and subscription operations.",
				"fields": [
					{
						"name": "types",
						"description": "A list of all types supported by this server.",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "OBJECT",
										"name": "__Type",
										"ofType": null
									}
								}
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "queryType",
						"description": "The type that query operations will be rooted at.",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "OBJECT",
								"name": "__Type",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "mutationType",
						"description": "If this server supports mutation, the type that mutation operations will be rooted at.",
						"args": [],
						"type": {
							"kind": "OBJECT",
							"name": "__Type",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "subscriptionType",
						"description": "If this server support subscription, the type that subscription operations will be rooted at.",
						"args": [],
						"type": {
							"kind": "OBJECT",
							"name": "__Type",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "directives",
						"description": "A list of all directives supported by this server.",
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "LIST",
								"name": null,
								"ofType": {
									"kind": "NON_NULL",
									"name": null,
									"ofType": {
										"kind": "OBJECT",
										"name": "__Directive",
										"ofType": null
									}
								}
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					}
				],
				"inputFields": null,
				"interfaces": [],
				"enumValues": null,
				"possibleTypes": null
			},
			{
				"kind": "OBJECT",
				"name": "__Type",
				"description": "The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name and description, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.",
				"fields": [
					{
						"name": "kind",
						"description": null,
						"args": [],
						"type": {
							"kind": "NON_NULL",
							"name": null,
							"ofType": {
								"kind": "ENUM",
								"name": "__TypeKind",
								"ofType": null
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "name",
						"description": null,
						"args": [],
						"type": {
							"kind": "SCALAR",
							"name": "String",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "description",
						"description": null,
						"args": [],
						"type": {
							"kind": "SCALAR",
							"name": "String",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "fields",
						"description": null,
						"args": [
							{
								"name": "includeDeprecated",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Boolean",
									"ofType": null
								},
								"defaultValue": "false"
							}
						],
						"type": {
							"kind": "LIST",
							"name": null,
							"ofType": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "OBJECT",
									"name": "__Field",
									"ofType": null
								}
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "interfaces",
						"description": null,
						"args": [],
						"type": {
							"kind": "LIST",
							"name": null,
							"ofType": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "OBJECT",
									"name": "__Type",
									"ofType": null
								}
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "possibleTypes",
						"description": null,
						"args": [],
						"type": {
							"kind": "LIST",
							"name": null,
							"ofType": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "OBJECT",
									"name": "__Type",
									"ofType": null
								}
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "enumValues",
						"description": null,
						"args": [
							{
								"name": "includeDeprecated",
								"description": null,
								"type": {
									"kind": "SCALAR",
									"name": "Boolean",
									"ofType": null
								},
								"defaultValue": "false"
							}
						],
						"type": {
							"kind": "LIST",
							"name": null,
							"ofType": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "OBJECT",
									"name": "__EnumValue",
									"ofType": null
								}
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "inputFields",
						"description": null,
						"args": [],
						"type": {
							"kind": "LIST",
							"name": null,
							"ofType": {
								"kind": "NON_NULL",
								"name": null,
								"ofType": {
									"kind": "OBJECT",
									"name": "__InputValue",
									"ofType": null
								}
							}
						},
						"isDeprecated": false,
						"deprecationReason": null
					},
					{
						"name": "ofType",
						"description": null,
						"args": [],
						"type": {
							"kind": "OBJECT",
							"name": "__Type",
							"ofType": null
						},
						"isDeprecated": false,
						"deprecationReason": null
					}
				],
				"inputFields": null,
				"interfaces": [],
				"enumValues": null,
				"possibleTypes": null
			},
{
	"kind": "ENUM",
	"name": "__TypeKind",
	"description": "An enum describing what kind of type a given `__Type` is",
	"fields": null,
	"inputFields": null,
	"interfaces": null,
	"enumValues": [
		{
			"name": "SCALAR",
			"description": "Indicates this type is a scalar.",
			"isDeprecated": false,
			"deprecationReason": null
		},
		{
			"name": "OBJECT",
			"description": "Indicates this type is an object. `fields` and `interfaces` are valid fields.",
			"isDeprecated": false,
			"deprecationReason": null
		},
		{
			"name": "INTERFACE",
			"description": "Indicates this type is an interface. `fields` and `possibleTypes` are valid fields.",
			"isDeprecated": false,
			"deprecationReason": null
		},
		{
			"name": "UNION",
			"description": "Indicates this type is a union. `possibleTypes` is a valid field.",
			"isDeprecated": false,
			"deprecationReason": null
		},
		{
			"name": "ENUM",
			"description": "Indicates this type is an enum. `enumValues` is a valid field.",
			"isDeprecated": false,
			"deprecationReason": null
		},
		{
			"name": "INPUT_OBJECT",
			"description": "Indicates this type is an input object. `inputFields` is a valid field.",
			"isDeprecated": false,
			"deprecationReason": null
		},
		{
			"name": "LIST",
			"description": "Indicates this type is a list. `ofType` is a valid field.",
			"isDeprecated": false,
			"deprecationReason": null
		},
		{
			"name": "NON_NULL",
			"description": "Indicates this type is a non-null. `ofType` is a valid field.",
			"isDeprecated": false,
			"deprecationReason": null
		}
	],
	"possibleTypes": null
},
{
	"kind": "OBJECT",
	"name": "__Field",
	"description": "Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.",
	"fields": [
		{
			"name": "name",
			"description": null,
			"args": [],
			"type": {
				"kind": "NON_NULL",
				"name": null,
				"ofType": {
					"kind": "SCALAR",
					"name": "String",
					"ofType": null
				}
			},
			"isDeprecated": false,
			"deprecationReason": null
		},
		{
			"name": "description",
			"description": null,
			"args": [],
			"type": {
				"kind": "SCALAR",
				"name": "String",
				"ofType": null
			},
			"isDeprecated": false,
			"deprecationReason": null
		},
		{
			"name": "args",
			"description": null,
			"args": [],
			"type": {
				"kind": "NON_NULL",
				"name": null,
				"ofType": {
					"kind": "LIST",
					"name": null,
					"ofType": {
						"kind": "NON_NULL",
						"name": null,
						"ofType": {
							"kind": "OBJECT",
							"name": "__InputValue",
							"ofType": null
						}
					}
				}
			},
			"isDeprecated": false,
			"deprecationReason": null
		},
		{
			"name": "type",
			"description": null,
			"args": [],
			"type": {
				"kind": "NON_NULL",
				"name": null,
				"ofType": {
					"kind": "OBJECT",
					"name": "__Type",
					"ofType": null
				}
			},
			"isDeprecated": false,
			"deprecationReason": null
		},
		{
			"name": "isDeprecated",
			"description": null,
			"args": [],
			"type": {
				"kind": "NON_NULL",
				"name": null,
				"ofType": {
					"kind": "SCALAR",
					"name": "Boolean",
					"ofType": null
				}
			},
			"isDeprecated": false,
			"deprecationReason": null
		},
		{
			"name": "deprecationReason",
			"description": null,
			"args": [],
			"type": {
				"kind": "SCALAR",
				"name": "String",
				"ofType": null
			},
			"isDeprecated": false,
			"deprecationReason": null
		}
	],
	"inputFields": null,
	"interfaces": [],
	"enumValues": null,
	"possibleTypes": null
},
{
	"kind": "OBJECT",
	"name": "__InputValue",
	"description": "Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.",
	"fields": [
		{
			"name": "name",
			"description": null,
			"args": [],
			"type": {
				"kind": "NON_NULL",
				"name": null,
				"ofType": {
					"kind": "SCALAR",
					"name": "String",
					"ofType": null
				}
			},
			"isDeprecated": false,
			"deprecationReason": null
		},
		{
			"name": "description",
			"description": null,
				 "args": [],
				 "type": {
					"kind": "SCALAR",
					"name": "String",
					"ofType": null
				 },
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "type",
				 "description": null,
				 "args": [],
				 "type": {
					"kind": "NON_NULL",
					"name": null,
					"ofType": {
					 "kind": "OBJECT",
					 "name": "__Type",
					 "ofType": null
					}
				 },
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "defaultValue",
				 "description": null,
				 "args": [],
				 "type": {
					"kind": "SCALAR",
					"name": "String",
					"ofType": null
				 },
				 "isDeprecated": false,
				 "deprecationReason": null
				}
			 ],
			 "inputFields": null,
			 "interfaces": [],
			 "enumValues": null,
			 "possibleTypes": null
			},
			{
			 "kind": "OBJECT",
			 "name": "__EnumValue",
			 "description": "One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.",
			 "fields": [
				{
				 "name": "name",
				 "description": null,
				 "args": [],
				 "type": {
					"kind": "NON_NULL",
					"name": null,
					"ofType": {
					 "kind": "SCALAR",
					 "name": "String",
					 "ofType": null
					}
				 },
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "description",
				 "description": null,
				 "args": [],
				 "type": {
					"kind": "SCALAR",
					"name": "String",
					"ofType": null
				 },
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "isDeprecated",
				 "description": null,
				 "args": [],
				 "type": {
					"kind": "NON_NULL",
					"name": null,
					"ofType": {
					 "kind": "SCALAR",
					 "name": "Boolean",
					 "ofType": null
					}
				 },
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "deprecationReason",
				 "description": null,
				 "args": [],
				 "type": {
					"kind": "SCALAR",
					"name": "String",
					"ofType": null
				 },
				 "isDeprecated": false,
				 "deprecationReason": null
				}
			 ],
			 "inputFields": null,
			 "interfaces": [],
			 "enumValues": null,
			 "possibleTypes": null
			},
			{
			 "kind": "OBJECT",
			 "name": "__Directive",
			 "description": "A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.\n\nIn some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.",
			 "fields": [
				{
				 "name": "name",
				 "description": null,
				 "args": [],
				 "type": {
					"kind": "NON_NULL",
					"name": null,
					"ofType": {
					 "kind": "SCALAR",
					 "name": "String",
					 "ofType": null
					}
				 },
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "description",
				 "description": null,
				 "args": [],
				 "type": {
					"kind": "SCALAR",
					"name": "String",
					"ofType": null
				 },
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "locations",
				 "description": null,
				 "args": [],
				 "type": {
					"kind": "NON_NULL",
					"name": null,
					"ofType": {
					 "kind": "LIST",
					 "name": null,
					 "ofType": {
						"kind": "NON_NULL",
						"name": null,
						"ofType": {
						 "kind": "ENUM",
						 "name": "__DirectiveLocation",
						 "ofType": null
						}
					 }
					}
				 },
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "args",
				 "description": null,
				 "args": [],
				 "type": {
					"kind": "NON_NULL",
					"name": null,
					"ofType": {
					 "kind": "LIST",
					 "name": null,
					 "ofType": {
						"kind": "NON_NULL",
						"name": null,
						"ofType": {
						 "kind": "OBJECT",
						 "name": "__InputValue",
						 "ofType": null
						}
					 }
					}
				 },
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "onOperation",
				 "description": null,
				 "args": [],
				 "type": {
					"kind": "NON_NULL",
					"name": null,
					"ofType": {
					 "kind": "SCALAR",
					 "name": "Boolean",
					 "ofType": null
					}
				 },
				 "isDeprecated": true,
				 "deprecationReason": "Use `locations`."
				},
				{
				 "name": "onFragment",
				 "description": null,
				 "args": [],
				 "type": {
					"kind": "NON_NULL",
					"name": null,
					"ofType": {
					 "kind": "SCALAR",
					 "name": "Boolean",
					 "ofType": null
					}
				 },
				 "isDeprecated": true,
				 "deprecationReason": "Use `locations`."
				},
				{
				 "name": "onField",
				 "description": null,
				 "args": [],
				 "type": {
					"kind": "NON_NULL",
					"name": null,
					"ofType": {
					 "kind": "SCALAR",
					 "name": "Boolean",
					 "ofType": null
					}
				 },
				 "isDeprecated": true,
				 "deprecationReason": "Use `locations`."
				}
			 ],
			 "inputFields": null,
			 "interfaces": [],
			 "enumValues": null,
			 "possibleTypes": null
			},
			{
			 "kind": "ENUM",
			 "name": "__DirectiveLocation",
			 "description": "A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.",
			 "fields": null,
			 "inputFields": null,
			 "interfaces": null,
			 "enumValues": [
				{
				 "name": "QUERY",
				 "description": "Location adjacent to a query operation.",
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "MUTATION",
				 "description": "Location adjacent to a mutation operation.",
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "SUBSCRIPTION",
				 "description": "Location adjacent to a subscription operation.",
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "FIELD",
				 "description": "Location adjacent to a field.",
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "FRAGMENT_DEFINITION",
				 "description": "Location adjacent to a fragment definition.",
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "FRAGMENT_SPREAD",
				 "description": "Location adjacent to a fragment spread.",
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "INLINE_FRAGMENT",
				 "description": "Location adjacent to an inline fragment.",
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "SCHEMA",
				 "description": "Location adjacent to a schema definition.",
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "SCALAR",
				 "description": "Location adjacent to a scalar definition.",
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "OBJECT",
				 "description": "Location adjacent to an object definition.",
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "FIELD_DEFINITION",
				 "description": "Location adjacent to a field definition.",
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "ARGUMENT_DEFINITION",
				 "description": "Location adjacent to an argument definition.",
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "INTERFACE",
				 "description": "Location adjacent to an interface definition.",
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "UNION",
				 "description": "Location adjacent to a union definition.",
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "ENUM",
				 "description": "Location adjacent to an enum definition.",
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "ENUM_VALUE",
				 "description": "Location adjacent to an enum value definition.",
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "INPUT_OBJECT",
				 "description": "Location adjacent to an input object definition.",
				 "isDeprecated": false,
				 "deprecationReason": null
				},
				{
				 "name": "INPUT_FIELD_DEFINITION",
				 "description": "Location adjacent to an input object field definition.",
				 "isDeprecated": false,
				 "deprecationReason": null
				}
			 ],
			 "possibleTypes": null
			}
		 ],
		 "directives": [
			{
			 "name": "include",
			 "description": "Directs the executor to include this field or fragment only when the `if` argument is true.",
			 "locations": [
				"FIELD",
				"FRAGMENT_SPREAD",
				"INLINE_FRAGMENT"
			 ],
			 "args": [
				{
				 "name": "if",
				 "description": "Included when true.",
				 "type": {
					"kind": "NON_NULL",
					"name": null,
					"ofType": {
					 "kind": "SCALAR",
					 "name": "Boolean",
					 "ofType": null
					}
				 },
				 "defaultValue": null
				}
			 ]
			},
			{
			 "name": "skip",
			 "description": "Directs the executor to skip this field or fragment when the `if` argument is true.",
			 "locations": [
				"FIELD",
				"FRAGMENT_SPREAD",
				"INLINE_FRAGMENT"
			 ],
			 "args": [
				{
				 "name": "if",
				 "description": "Skipped when true.",
				 "type": {
					"kind": "NON_NULL",
					"name": null,
					"ofType": {
					 "kind": "SCALAR",
					 "name": "Boolean",
					 "ofType": null
					}
				 },
				 "defaultValue": null
				}
			 ]
			}
		 ]
		}
	 }
	}


function simplificarType(t) {
	if (t.ofType) {
		let t0= t.ofType.name!=null ? t : t.ofType;
		const r= {t: t0.ofType.name}
		if (['SCALAR','INPUT_OBJECT'].indexOf(t0.kind)==-1 ) { r.k= t0.kind; }
		return r;
	}
	else {
		return {t: t.name}
	}
}

MiSchema= {tipos: {}, consultas: {}, modificaciones: {}};

s0= SCHEMA.data.__schema.types;
s0.forEach(t => {
	if (t.name.startsWith('__')) return;
	//console.log(t.name,t.kind,Object.keys(t))
	if (t.name=='Consultas') {
		t.fields.forEach( q => {
			const e= simplificarType(q.type);
			e.params= {},
			q.args.forEach(a => {
				if (['first','last','offset','before','after'].indexOf(a.name)==-1) {
					e.params[a.name]= simplificarType(a.type);
				}
			})
			MiSchema.consultas[q.name]= e;
		});
	}
	else if (t.name=='Modificaciones') {
		t.fields.forEach( modif => {
			const e= simplificarType(modif.type);
			e.params= {},
			modif.args.forEach(a => {
				e.params[a.name]= simplificarType(a.type);
			})
			MiSchema.modificaciones[modif.name]= e;
		});
	}
	else {
		const e= {};
		if (t.inputFields) {
			e.params= {};
			t.inputFields.forEach( infield => {
				e.params[infield.name]= simplificarType(infield.type);
			});
		}
		if (t.fields) {
			e.fields= {};
			t.fields.forEach( field => {
				const f = simplificarType(field.type);
				if (field.args) {
					f.params= {};
					field.args.forEach(a => {
						if (['first','last','offset','before','after'].indexOf(a.name)==-1) {
							f.params[a.name]= simplificarType(a.type);
						}
					})
				}
				e.fields[field.name]= f;
			});
		}
		MiSchema.tipos[t.name]= e;
	}
});

//DBG: console.log(JSON.stringify(MiSchema,null,2))

//Quiero conseguir 
qm= ['textoLista', 'texto', ['deQuien','username'], ['charlaitemSet', ['charla', 'titulo',['deQuien','username']], 'orden']]



function recorrerTipos(t0,buscando, acc0) {
	let t= MiSchema.tipos[t0];
	let acc= acc0 ||[];
	//DBG: console.log('recorrerTipos',JSON.stringify(t));
	if (t.fields.edges) {
		return recorrerTipos(t.fields.edges.t, buscando, [...acc,'edges']);
	}
	else if (t.fields.node) {
		return recorrerTipos(t.fields.node.t, buscando, [...acc,'node']);
	}
	return [acc, t.fields[buscando]]
}

function recorrerQuery(t0,partes) {
	let t= MiSchema.tipos[t0];
	let closing= '';
	if (t.fields.edges) { console.log(' edges {'); closing+='}'; t= MiSchema.tipos[t.fields.edges.t]; }
	if (t.fields.node) { console.log(' node {'); closing+='}'; t= MiSchema.tipos[t.fields.node.t]; }
	partes.forEach(p => {
		if (Array.isArray(p)) {
			console.log(p[0]+' {');
			recorrerQuery(t.fields[p[0]].t,p.slice(1));
			console.log(' }');
		}
		else {
			//DBG: console.log('PARTE',p,xt);
			console.log(p);
		}
	});
	console.log(closing);
}
q= MiSchema.consultas[qm[0]];
console.log('{' +qm[0] +' { ');
t0= recorrerQuery(q.t,qm.slice(1)) 
console.log('}}');
