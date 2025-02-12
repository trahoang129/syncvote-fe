import { useState } from 'react';
import PlusIcon from '@assets/icons/svg-icons/PlusIcon';
import Button from '@components/Button/Button';
import { L } from '@utils/locales/L';
import Icon from '@components/Icon/Icon';
import { useSelector } from 'react-redux';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { useNavigate } from 'react-router-dom';
import { createIdString, getImageUrl } from '@utils/helpers';
import { Modal } from 'antd';
import NewOrgFrm from './list/NewOrgFrm';

const Organization = () => {
  const { orgs, presetBanners } = useSelector((state: any) => state.ui);
  const [shouldShowForm, setShouldShowForm] = useState(false);
  const presetBanner = presetBanners[15] ? getImageUrl({ filePath: presetBanners[15], isPreset: true, type: 'banner' }) : null;
  const navigate = useNavigate();
  return (
    <div className="mt-8 container mx-auto relative">
      <div className="flex items-center mb-10 container justify-between">
        <div className="flex text-lg font-bold">{L('yourOrganization')}</div>
        <Button
          variant="outline"
          startIcon={<PlusIcon />}
          onClick={
            () => setShouldShowForm(true)
          }
        >
          {L('createANewOrganization')}
        </Button>
      </div>
      <div className="grid grid-flow-row grid-cols-3 gap-4 justify-items-center">
        {orgs.map((org:any) => {
          let bannerUrl = presetBanner;
          if (org.banner_url) {
            const filePath = org.banner_url.indexOf('preset:') === 0 ? org.banner_url.replace('preset:', '') : org.banner_url;
            bannerUrl = getImageUrl({ filePath, isPreset: org.banner_url.indexOf('preset:') === 0, type: 'banner' });
          }
          return (
            <div
              key={org.id}
              className="w-[290px] border-b_1 cursor-pointer hover:drop-shadow-lg"
              onClick={() => {
                navigate(`${PAGE_ROUTES.ORG_DETAIL}/${createIdString(org.title, org.id)}`);
              }}
            >
              {org.background_url ?
                <div className="w-[290px] h-[142px]" />
              :
                (
                  <div
                    className="w-[290px] h-[142px] bg-cover"
                    // className="w-[290px] h-[142px] bg-gradient-to-tr from-gray-500 to-gray-700"
                    style={{ backgroundImage: `url(${bannerUrl})` }}
                  />
                )
              }
              <div className="flex flex-col items-left pl-4 pr-4 pb-4 bg-card-bg">
                <div className="-mt-8">
                  {org.icon_url ?
                    // <Avatar size={64} src={org.icon_url} className="outline outline-2" />
                    <Icon size="large" iconUrl={org.icon_url} />
                    :
                    (
                      <Icon size="large">
                        {org?.title?.charAt(0)}
                      </Icon>
                    )
                  }
                </div>
                <div className="mt-2 text-lg text-ellipsis">{org.title}</div>
                <div className="mt-2 text-xs text-ellipsis">{org.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        open={shouldShowForm}
        title={L('createANewOrganization')}
        footer={null}
        onCancel={() => setShouldShowForm(false)}
      >
        <NewOrgFrm onSubmit={() => {
          setShouldShowForm(false);
        }}
        />
      </Modal>
    </div>
  );
};

export default Organization;
