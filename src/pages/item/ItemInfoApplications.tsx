import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  useTheme
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '@mui/icons-material';

import type { ApplicationIdT } from '~/types';
import { DbContext } from '~/contexts';

export type ItemInfoApplicationsProps = {
  applicationIds: ApplicationIdT[]
}

export const ItemInfoApplications = ({ applicationIds }: ItemInfoApplicationsProps) => {
  const theme = useTheme();

  const { db } = React.useContext(DbContext);

  return (
    <>
      <Typography variant={'overline'}>
        Области применения
      </Typography>

      <List disablePadding>
        {applicationIds.map(applicationId => (
          <ListItem key={applicationId} disablePadding>
            <ListItemIcon sx={{ minWidth: theme.spacing(1) }}>
              <ArrowRightIcon/>
            </ListItemIcon>
            <ListItemText>{db.applications[applicationId]}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
