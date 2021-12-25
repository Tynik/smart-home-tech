import React from 'react';
import {
  Grid,
  Button,
  Stack,
  Box,
  TextField
} from '@material-ui/core';

import type { ItemT } from '../../types';

import { AppContext, UserContext } from '../../contexts';
import { netlifyMakeOrder } from '../../api';
import { getIcon } from '../../utils';

export type BasketStep2Props = {
  active: boolean
  items: ItemT[]
  totalPrice: number
  onBefore: () => void
}

const BasketStep2 = ({ active, items, totalPrice, onBefore }: BasketStep2Props) => {
  const {
    user: { basket },
    clearBasket
  } = React.useContext(UserContext);

  const { addNotification } = React.useContext(AppContext);

  const [fullname, setFullname] = React.useState<string>(null);
  const [phone, setPhone] = React.useState<string>(null);
  const [address, setAddress] = React.useState<string>(null);
  const [comment, setComment] = React.useState<string>(null);

  const makeOrder = async () => {
    try {
      await netlifyMakeOrder({
        items: items.map(item =>
          `${basket.items[item.id]} x https://smart-home-tech.com.ua/item/${item.id}`
        ),
        fullname,
        phone,
        address,
        comment,
        totalPrice
      });
      clearBasket();

      addNotification('Вы успешно оформили заказ. Мы Вам перезвоним!');
    } catch (e) {
      addNotification('Ошибка при оформлении заказа. Попробуйте позже', {
        severity: 'error'
      });
    }
  };

  if (!active) {
    return null;
  }

  return (
    <>
      <Grid justifyContent={'center'} container item>
        <Grid xs={6} item>
          <Box
            component={'form'}
            autoComplete={'off'}
            sx={{
              '& .MuiTextField-root': { m: 1 }
            }}
            noValidate
          >
            <TextField
              value={fullname || ''}
              onChange={(e) => setFullname(e.target.value)}
              label={'ФИО'}
              variant={'outlined'}
              size={'small'}
              error={fullname === ''}
              helperText={fullname === '' && 'ФИО является обязательным'}
              fullWidth
            />

            <TextField
              value={phone || ''}
              onChange={(e) => setPhone(e.target.value)}
              label={'Тел.'}
              variant={'outlined'}
              size={'small'}
              error={phone === ''}
              helperText={phone === '' && 'Телефон является обязательным'}
              fullWidth
            />

            <TextField
              value={address || ''}
              onChange={(e) => setAddress(e.target.value)}
              label={'Адрес'}
              variant={'outlined'}
              size={'small'}
              error={address === ''}
              helperText={address === '' && 'Адрес является обязательным'}
              fullWidth
            />

            <TextField
              value={comment || ''}
              onChange={(e) => setComment(e.target.value)}
              label={'Комментарий'}
              variant={'outlined'}
              size={'small'}
              multiline
              fullWidth
            />
          </Box>
        </Grid>
      </Grid>

      <Grid item>
        <Stack
          spacing={2}
          direction={'row'}
          sx={{ justifyContent: 'right' }}
        >
          <Button
            onClick={onBefore}
            startIcon={getIcon('navigateBefore')}
            variant={'outlined'}
          >
            Назад
          </Button>

          <Button
            onClick={makeOrder}
            disabled={!fullname || !phone || !address}
            startIcon={getIcon('money')}
            color={'success'}
            variant={'contained'}
          >
            Оформить
          </Button>
        </Stack>
      </Grid>
    </>
  );
};

export default BasketStep2;
