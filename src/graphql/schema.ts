import { schema } from "@composabase/sdk"

import helloCustom from './modules/hello-custom'
import scifi from './modules/sci-fi'

schema.query('hello', {
  definition: {
    type: schema.string(),
    args: {
      name: schema.string().optional(),
      isImportant: schema.boolean().optional(),
    },
  },
  resolver: 'hello',
})

schema.modules([
  helloCustom,
  scifi,
])

export default schema
