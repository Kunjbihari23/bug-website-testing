import React from 'react';
import { Badge, Group } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { formatCurrency } from '@/util/commonFunction';
import { furnishingStatus } from './StaticFilterArray';

function AppliedFilters({ selectedChips, onRemoveFilter }) {
  const specialLabels = {
    SFA: 'Security Fire Alarm',
    PowerBackup: 'Power Backup',
    rera: 'RERA Approved',
    verified: 'Verified',
  };

  const getFurnishingLabel = (value) => {
    const furnishingOption = furnishingStatus.find((option) => option.value === value);
    return furnishingOption ? furnishingOption.label : value;
  };

  return (
    <Group spacing="xs">
      {Object.entries(selectedChips).map(([category, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          return value.map((chip) => (
            <Badge
              key={`${category}-${chip.value}`}
              variant="light"
              color="blue"
              size="lg"
              rightSection={
                <IconX size={15} style={{ cursor: 'pointer' }} onClick={() => onRemoveFilter(category, chip.value)} />
              }
            >
              {chip.label || `${chip.value}`}
            </Badge>
          ));
        } else if (category === 'minVal' || category === 'maxVal') {
          return null;
        } else if (value && typeof value !== 'object') {
          let displayLabel;

          if (category === 'FURNISHED') {
            displayLabel = getFurnishingLabel(value);
          } else if (['SFA', 'PowerBackup', 'rera', 'verified'].includes(category)) {
            displayLabel = specialLabels[category] || category;
          } else {
            displayLabel = specialLabels[category] ? `${specialLabels[category]}: ${value}` : value;
          }

          return (
            <Badge
              key={category}
              variant="light"
              color="blue"
              size="lg"
              rightSection={
                <IconX size={15} style={{ cursor: 'pointer' }} onClick={() => onRemoveFilter(category, value)} />
              }
            >
              {displayLabel}
            </Badge>
          );
        }
        return null;
      })}
      {(selectedChips.minVal || selectedChips.maxVal) && (
        <Badge
          key="price-range"
          variant="light"
          color="blue"
          size="lg"
          rightSection={
            <IconX
              size={15}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                onRemoveFilter('minVal', selectedChips.minVal);
                onRemoveFilter('maxVal', selectedChips.maxVal);
              }}
            />
          }
        >
          {`${formatCurrency(selectedChips.minVal || 100000)} - ${formatCurrency(selectedChips.maxVal || 50000000)}`}
        </Badge>
      )}
    </Group>
  );
}

export default AppliedFilters;
