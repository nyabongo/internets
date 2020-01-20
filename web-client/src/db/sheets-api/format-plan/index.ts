import { Plan } from '../../interface';

const hours = {
  minute: 1 / 60,
  hour: 1,
  day: 1 * 24,
  week: 1 * 24 * 7,
  month: 1 * 24 * 30,
  year: 1 * 24 * 365.25,
};

const megaBytes = {
  KB: 1 / 1000,
  MB: 1,
  GB: 1000,
  TB: 1000000,
};

type DurationUnits = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'
type VolumeUnits = 'KB' | 'MB' | 'GB' | 'TB'
const parseValue = (val: string|number) => parseFloat(val.toString().replace(/,/g, ''));

const getDurationMagnitude = (
  { value, unit }: { value: string | number; unit: DurationUnits },
) => parseValue(value) * (hours[unit] || 1);

const getVolumeMagnitude = (
  { value, unit }: { value: string | number; unit: VolumeUnits },
) => parseValue(value) * (megaBytes[unit] || 1);


const processPlan = ({
  duration, volume, price, ...other
}: Plan) => {
  const plan = {
    ...other,
    duration: {
      ...duration,
      magnitude: getDurationMagnitude(duration as { value: number; unit: DurationUnits }),
    },
    volume: {
      ...volume,
      magnitude: getVolumeMagnitude(volume as { value: number; unit: VolumeUnits }),
    },
    price: {
      ...price,
      value: parseValue(price.value),
    },
  };
  return plan;
};
export default processPlan;
