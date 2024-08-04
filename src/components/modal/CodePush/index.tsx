import React, {Fragment, useState} from 'react';
import codePush, {DownloadProgress} from 'react-native-code-push';
import PendingNewVersion from './PendingNewVersion';
import {SelectVersion} from './SelectVersion';

const enum UpdateStatus {
  LATEST,
  HAVE_NEW_VERSION,
  REQUIRE_UPDATE,
}

export const CodePush: React.FC = () => {
  const [syncStatus, setSyncStatus] = useState(codePush.SyncStatus.UP_TO_DATE);
  const [codePushStatus, setCodePushStatus] = useState<UpdateStatus>(UpdateStatus.LATEST);
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress>();

  const updateCodepushHandler = (deploymentKey: string, immediate: boolean) => {
    setCodePushStatus(UpdateStatus.LATEST);
    codePush.sync(
      {
        installMode: immediate ? codePush.InstallMode.IMMEDIATE : codePush.InstallMode.ON_NEXT_RESUME,
        deploymentKey,
        minimumBackgroundDuration: 10,
        rollbackRetryOptions: {
          delayInHours: 4,
          maxRetryAttempts: 3,
        },
      },
      s => {
        if (immediate) {
          setSyncStatus(s);
        }
      },
      p => {
        if (immediate) {
          setDownloadProgress(p);
        }
      },
    );
  };

  const isLoadingDownload =
    syncStatus === codePush.SyncStatus.CHECKING_FOR_UPDATE ||
    syncStatus === codePush.SyncStatus.DOWNLOADING_PACKAGE ||
    syncStatus === codePush.SyncStatus.INSTALLING_UPDATE;

  return (
    <Fragment>
      <SelectVersion isLoadingDownload={isLoadingDownload} onUpdate={updateCodepushHandler} />
      {isLoadingDownload && (
        <PendingNewVersion
          isVisible={true}
          totalBytes={downloadProgress?.totalBytes}
          receivedBytes={downloadProgress?.receivedBytes}
        />
      )}
    </Fragment>
  );
};
