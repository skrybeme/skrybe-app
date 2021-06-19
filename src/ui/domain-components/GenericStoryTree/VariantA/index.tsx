import React from 'react';
import { GenericStoryTreeProps } from '@/interfaces/props';
import { CardTeaser_VariantB as CardTeaser } from '@/ui/components/CardTeaser';
import { useGenericStoryTree } from '../hook';
import * as S from './styles';
import { PickerCardTeaserOptions_VariantB } from '../../PickerCardTeaserOptions/VariantB';
import { useToggle } from '@/ui/hooks';
import { CardTeaserPlaceholder_VariantA } from '@/ui/components/CardTeaserPlaceholder/VariantA';
import { CSSProperties } from 'styled-components';

export function GenericStoryTree_VariantA({
  generateChildrenTreeNodes,
  insertTreeNode,
  removeTreeNode,
  root,
  style,
  updateTreeNode
}: GenericStoryTreeProps): React.ReactElement<GenericStoryTreeProps> {
  const { generateSubcards, insertCard, removeCard, updateCard } = useGenericStoryTree({
    generateChildrenTreeNodes,
    insertTreeNode,
    removeTreeNode,
    updateTreeNode
  });

  const { isOpen, toggle } = useToggle(false);

  return (
    <S.GenericStoryTree_VariantA
      data-testid="generic-card-teaser-tree"
      childless={root?.children.length === 0}
      optionsOpen={isOpen}
      style={style}
    >
      {root && (
        <React.Fragment>
          <S.CardTeaserContext
            childless={!root.children.length}
            hidePlaceholders={isOpen}
            oneChild={root.children.length === 1}
            optionsOpen={isOpen}
          >
            {root.parentId !== null && (
              <>
                <S.CardTeaserPlaceholderContext>
                  <CardTeaserPlaceholder_VariantA
                    label="+ Add card above"
                    onClick={insertCard(root.parentId, root.id)}
                  />
                </S.CardTeaserPlaceholderContext>
                <S.VEdge />
              </>
            )}
            <CardTeaser
              header={root?.header || ''}
              onBlur={updateCard}
              tags={root?.tags || []}
            />
            <PickerCardTeaserOptions_VariantB
              onGenerateChildren={generateSubcards(root.id)}
              onRemoveNode={removeCard(root.id)}
              onToggle={toggle}
            />
            {root.parentId !== null && (
              <S.CardTeaserPlaceholderContext>
                <CardTeaserPlaceholder_VariantA
                  label="+ Add card below"
                  onClick={insertCard(root.parentId)}
                />
              </S.CardTeaserPlaceholderContext>
            )}
            {!root.children.length && (
              <S.CardTeaserPlaceholderContext move>
                <CardTeaserPlaceholder_VariantA
                  label="+ Add subcard"
                  onClick={insertCard(root.id)}
                />
              </S.CardTeaserPlaceholderContext>
            )}
          </S.CardTeaserContext>
          <S.LevelContext>
            {root.children.map((child, index) => (
              <React.Fragment key={child.id}>
                <GenericStoryTree_VariantA
                  generateChildrenTreeNodes={generateChildrenTreeNodes}
                  insertTreeNode={insertTreeNode}
                  removeTreeNode={removeTreeNode}
                  root={child}
                  style={{ zIndex: root.children.length - index }}
                  updateTreeNode={updateTreeNode}
                />
              </React.Fragment>
            ))}
          </S.LevelContext>
        </React.Fragment>
      )}
    </S.GenericStoryTree_VariantA>
  );
}
