import {
  Attributes,
  CommonAttributes,
  AttributeSchema,
  Attribute,
  EntriesFromAttributesSchema,
} from '@shared'

enum FileStorageType {
  S3 = 'S3',
  LOCAL = 'LOCAL',
}

enum MimeType {
  PNG = 'png',
  JPEG = 'jpeg',
  UNKNOWN = 'unknown',
}

export type PhotoAttributesSchema = CommonAttributes & {
  entity_type: AttributeSchema<'PHOTO', true>
  creator_type: AttributeSchema<'USER', true>
  mime_type: AttributeSchema<MimeType, false>
  file_size?: AttributeSchema<number, false>
  file_extension?: AttributeSchema<string, false>
  file_key: AttributeSchema<string, false> // use to identify, for now just s3, keep consistent
  file_storage_type: AttributeSchema<FileStorageType, true>
}

export class PhotoAttributes extends Attributes<PhotoAttributesSchema> {
  constructor() {
    const creator_type = new Attribute<'USER', true>({
      required: true,
      value: 'USER',
    })
    const entity_type = new Attribute<'PHOTO', true>({
      required: true,
      value: 'PHOTO',
    })
    const mime_type = new Attribute<MimeType, false>({
      required: true,
      value: MimeType.UNKNOWN,
    })
    const file_size = new Attribute<number, false>({
      required: false,
      value: null,
    })
    const file_extension = new Attribute<string>({
      required: false,
      value: null,
    })

    const file_key = new Attribute<string>({ required: false, value: null })

    const file_storage_type = new Attribute<FileStorageType, true>({
      required: true,
      value: FileStorageType.S3,
    })

    super({
      creator_type,
      entity_type,
      mime_type,
      file_size,
      file_extension,
      file_key,
      file_storage_type,
    })
  }

  parse(
    attributes: Partial<EntriesFromAttributesSchema<PhotoAttributesSchema>>,
  ): void {
    super.parse({ ...attributes, entity_type: 'PHOTO', creator_type: 'USER' })
  }
}
