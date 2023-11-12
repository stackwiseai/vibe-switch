import { Prediction } from '../app/page';

export const appName = 'Vibe Switch';
export const appSubtitle =
  'Transform your images mood and atmosphere with AI-guided vibe switches.';
export const appMetaDescription =
  'Transform your images mood and atmosphere with AI-guided vibe switches.';

export const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

interface PollStatusProps {
  url: string;
  setPrediction: React.Dispatch<React.SetStateAction<Prediction | null>>;
  setPredictions: React.Dispatch<React.SetStateAction<Prediction[]>>;
  predictions: Prediction[];
}

export const pollStatus = async ({
  url,
  setPrediction,
  setPredictions,
  predictions,
}: PollStatusProps) => {
  let statusResponse;
  let statusData: Prediction;

  do {
    await sleep(500);
    statusResponse = await fetch(url);
    statusData = await statusResponse.json();

    if (statusResponse.status !== 200) {
      throw new Error(statusData.detail);
    }

    // just for bookkeeping
    setPredictions(predictions.concat([statusData]));
    setPrediction(statusData);
  } while (statusData.status !== 'succeeded' && statusData.status !== 'failed');

  return statusData;
};
