import React from 'react';
import {
  Box,
  Modal,
  styled,
  Typography,
  useTheme
} from '@mui/material';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import type { ItemImageT } from '~/types';

import { Loader } from './Loader';
import { CImage } from './CImage';

const CustomCarousel = styled(Carousel)(({ theme }) => (
  {
    '& > .carousel img': {
      pointerEvents: 'auto'
    },
    '& > .carousel .thumbs-wrapper': {
      margin: 0,
      '& > ul': {
        margin: 0,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        '& > li': {
          cursor: 'pointer',
          '&:last-child': {
            marginRight: 0
          }
        },
      }
    }
  }
));

export type ImageSliderProps = {
  images: ItemImageT[]
  height: string
}

export const ImageSlider = (props: ImageSliderProps) => {
  const { images, height } = props;

  const theme = useTheme();

  const [inLoading, setInLoading] = React.useState(images.length);
  const [zoomedImage, setZoomedImage] = React.useState<ItemImageT>(null);

  const onImageClick = (image: ItemImageT, index: number) => {
    setZoomedImage(image);
  };

  return (
    <>
      {inLoading > 0 && (
        <Loader style={{
          height: '300px',
          alignItems: 'center'
        }}/>
      )}

      {/*https://github.com/leandrowd/react-responsive-carousel*/}
      <CustomCarousel
        theme={theme}
        sx={{ display: inLoading > 0 ? 'none' : 'block' }}
        renderThumbs={(children) =>
          children.map((child: any) => {
            const props = child.props.children.props;
            return <img
              key={`${props.key}-thumb`}
              src={props.src}
              alt={props.alt}
              title={props.alt}
            />;
          })
        }
        autoPlay={false}
        showStatus={false}
        infiniteLoop
      >
        {images.map((image, index) => (
          <div
            key={`image-${index}`}
            style={{ height: height, cursor: 'zoom-in' }}
            onClick={() => onImageClick(image, index)}
          >
            <CImage
              src={image.src}
              alt={image.alt}
              description={image.description}
              style={{
                height: '100%',
                objectFit: 'scale-down'
              }}
              onLoad={() => setInLoading((inLoading) => --inLoading)}
            />
          </div>
        ))}
      </CustomCarousel>

      {zoomedImage && (
        <Modal
          open={true}
          onClose={() => setZoomedImage(null)}
        >
          <Box sx={{
            maxHeight: `calc(100% - ${theme.spacing(4)})`,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'background.paper',
            border: '1px solid #000',
            boxShadow: 24,
            overflow: 'scroll',
            p: 1
          }}>
            <Typography variant={'subtitle1'}>{zoomedImage.alt}</Typography>

            <img
              src={zoomedImage.src}
              alt={''}
              onClick={() => setZoomedImage(null)}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                cursor: 'zoom-out'
              }}/>
          </Box>
        </Modal>
      )}
    </>
  );
};
