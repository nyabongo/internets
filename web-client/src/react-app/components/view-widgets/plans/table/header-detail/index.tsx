import React, { useContext, useState, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { CardHeader, Avatar } from '@material-ui/core';
import filterContext from '../../../../../../db/filter';
import { DBContext } from '../../../../../../db';

const HeaderDetail = () => {
  const { provider: providerId, service: serviceId } = useContext(filterContext);
  const { getServiceProviderById, getServiceById } = useContext(DBContext);
  const [provider, setProvider] = useState();
  const [service, setService] = useState();

  useEffect(() => {
    if (providerId) {
      getServiceProviderById(providerId).then((result) => {
        setProvider(result);
      });
    } else { setProvider(null); }
  }, [providerId, getServiceProviderById]);

  useEffect(() => {
    if (serviceId) {
      getServiceById(serviceId).then((result) => {
        setService(result);
      });
    } else { setService(null); }
  }, [serviceId, getServiceById]);

  const main = service || provider || { name: 'Plans' };

  return (
    <ExpansionPanel elevation={0}>
      <ExpansionPanelSummary style={{ padding: 0, margin: 0 }} expandIcon={<ExpandMoreIcon />}>
        <CardHeader
          style={{ padding: '0 16px' }}
          avatar={provider && <Avatar src={main.logo || provider.logo} />}
          title={main.name}
          subheader={service && provider && provider.name}
        />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          {main.description}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
export default HeaderDetail;
