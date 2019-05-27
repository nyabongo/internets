import React, { useState } from 'react';
import {
  Card, CardContent, TextField, Button, CardActions,
} from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';


const SourceLinks = ({ source }: { source: string }) => {
  const [sheetId, setSheetId] = useState(source);
  const codeSource = 'https://github.com/256-io/internets/tree/dev';
  const dataSourceURL = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
  const sourceUnChanged = source === sheetId;
  return (
    <Card>
      <CardContent>
        <TextField
          label="Google Sheet Id"
          onChange={(e) => { setSheetId(e.target.value); }}
          fullWidth
          value={sheetId}
        />
      </CardContent>
      <CardActions>
        <Button component="a" href={`/?sheetId=${sheetId}`} disabled={sourceUnChanged}>
          Load New Source
        </Button>
        <Button component="a" target="_blank" href={dataSourceURL}>
          Open Sheet
        </Button>
        <Button style={{ marginLeft: '16px' }} component="a" target="_blank" href={codeSource}>
          <CodeIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default SourceLinks;
