import Sort from '@/components/Sort';
import Card from '@/components/Card';
import { getFiles } from '@/lib/actions/file.actions';
import { getFileTypesParams } from '@/lib/utils';
import { Models } from 'node-appwrite';
import React from 'react'

const Page = async ({ searchParams, params }: SearchParamProps) => {
    const type = ((await params)?.type as string) || "";
    const searchText = ((await searchParams)?.query as string) || "";
    const sort = ((await searchParams)?.sort as string) || "";

    const types = getFileTypesParams(type) as FileType[];

    const files = await getFiles({ types, searchText, sort });
    
    // Calculate total size
    const totalSize = files.documents.reduce(
      (total: number, file: Models.Document) => total + (file.size || 0),
      0
    );

    const totalSizeInMB = (totalSize / (1024 * 1024)).toFixed(2); 
    

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>

        <div className="total-size-section">
            <p className="body-1">
                Total: <span className="h-5">{totalSizeInMB} MB</span>
            </p>

            <div className="sort-container">
                <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>
                <Sort />
            </div>
        </div>
      </section>

      {files.total > 0 ? (
        <section className="file-list">
            {files.documents.map((file: Models.Document) => (
                <Card key={file.$id} file={file} />
            ))}
        </section>
      ) : (
        <p className="text-light-200">No files uploaded yet</p>
      )}
    </div>
  )
}

export default Page
