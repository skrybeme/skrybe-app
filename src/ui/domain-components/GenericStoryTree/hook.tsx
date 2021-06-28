import { GenericStoryTreeProps } from '@/interfaces/props';
import { SidebarContext } from '@/ui/components/Sidebar/context';
import React from 'react';

export interface GenericStoryTreeHookResult {
  generateSubcards: (nodeId: string) => (source: 'body' | 'header') => void;
  isOptionsPickerOpen: boolean;
  insertCard: (
    parentNodeId?: string,
    place?: {
      afterOrBefore: 'after' | 'before';
      nodeId: string;
    }
  ) => () => void;
  onOptionsPickerToggle: (isOpen: boolean) => void;
  openCard: (nodeId: string) => () => void;
  removeCard: (nodeId: string) => () => void;
  updateCard: (nodeId: string) => (header: string) => void;
}

export function useGenericStoryTree({
  generateChildrenTreeNodes,
  insertTreeNode,
  removeTreeNode,
  updateTreeNode
}: Omit<GenericStoryTreeProps, 'root'>): GenericStoryTreeHookResult {
  const generateSubcards = React.useCallback(
    (nodeId: string) => {
      return (source: 'body' | 'header'): void => {
        generateChildrenTreeNodes(source, nodeId);
      }
    },
    []
  );

  const insertCard = React.useCallback(
    (
      parentNodeId?: string,
      place?: {
        afterOrBefore: 'after' | 'before';
        nodeId: string;
      }
    ) => {
      return (): void => {
        insertTreeNode(parentNodeId, place)
      }
    },
    [insertTreeNode]
  );

  const removeCard = React.useCallback((nodeId: string) => {
    return (): void => {
      removeTreeNode(nodeId);
    }
  }, []);

  const updateCard = React.useCallback((nodeId: string) => {
    return (header: string): void => {
      updateTreeNode(nodeId, { header });
    }
  }, []);

  const [isOptionsPickerOpen, setIsOptionsPickerOpen] = React.useState(false);

  const onOptionsPickerToggle = React.useCallback((isOpen: boolean) => {
    setIsOptionsPickerOpen(isOpen);
  }, []);

  const { open, setCardId } = React.useContext(SidebarContext);

  const openCard = React.useCallback((nodeId: string) => {
    return () => {
      setCardId(nodeId);

      open();
    };
  }, [open, setCardId]);

  return {
    generateSubcards,
    isOptionsPickerOpen,
    insertCard,
    onOptionsPickerToggle,
    openCard,
    removeCard,
    updateCard
  };
}
