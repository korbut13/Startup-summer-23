import React from 'react';

import { FavoriteIconProps } from '../../utils/interfaces';
import { Star } from '../star/_star';
import { PaintedStar } from '../star/_paintedStar';

export const FavoriteIcon: React.FC<FavoriteIconProps> = ({ favoriteVacancies, idVacancy }) => {
  if (favoriteVacancies.includes(idVacancy)) {
    return <PaintedStar />;
  } else return <Star />;
};
