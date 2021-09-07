import React from 'react';
import { defaultStoryTreeInfoCollection } from "@/data-sources/localstorage/data"
import { useParams } from 'react-router-dom';
import { TreeDetails } from '.';

export function TreeDetailsRoute() {
  const { id } = useParams<{ id?: string }>();

  return (
    <TreeDetails storyTreeInfoId={id || defaultStoryTreeInfoCollection[0].id} />
  )
}
