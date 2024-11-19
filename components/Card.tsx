import Link from 'next/link'
import React from 'react'
import Thumbnail from './Thumbnail'
import { convertFileSize } from '@/lib/utils'
import ActionDropdown from './ActionDropdown'
import { FormattedDateTime } from './FormattedDateTime'
import { Models } from 'node-appwrite'

const Card = ({ file }: { file: Models.Document }) => {
  return (
    <Link href={file.url} target="_blank" className="file-card"   >
        <div className="flex justify-between">
            <Thumbnail 
                type={file.type} 
                extension={file.extension} 
                url={file.url}
                className="!size-20"
                imageClassName="!size-11"
            />
            
            <div className="flex flex-col items-end justify-between">
                <ActionDropdown file={file} />
                <p className="body-1">{convertFileSize(file.size)}</p>
            </div>
        </div>

        <div className="file-card-details">
            <p className="subtitle-2 line-clamp-1">{file.name}</p>
            <FormattedDateTime 
                date={file.$createdAt} 
                className="text-light-100 body-2"
            />
            <p className="text-light-200 caption line-clamp-1">
                By: {file.owner.fullName}
            </p>
        </div>
    </Link>
  )
}

export default Card