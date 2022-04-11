import PropTypes from 'prop-types';

// material-ui
import { Button, ButtonGroup, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';

// third-party
import moment from 'moment';

// assets

import { RightOutlined, LeftOutlined } from '@ant-design/icons';

const viewOptions = [
  {
    label: 'Month',
    value: 'dayGridMonth',
    icon: RightOutlined,
  },
  {
    label: 'Week',
    value: 'timeGridWeek',
    icon: RightOutlined,
  },
  {
    label: 'Day',
    value: 'timeGridDay',
    icon: RightOutlined,
  },
  {
    label: 'Agenda',
    value: 'listWeek',
    icon: RightOutlined,
  },
];

// ==============================|| CALENDAR TOOLBAR ||============================== //

const Toolbar = ({ date, view, onClickNext, onClickPrev, onClickToday, onChangeView, ...others }) => (
  <Grid alignItems="center" container justifyContent="center" spacing={3} {...others} sx={{ pb: 3 }}>
    {/* <Grid item>
      <Button variant="outlined">Today</Button>
    </Grid> */}
    <Grid item>
      <Stack direction="row" alignItems="center" spacing={3}>
        <IconButton onClick={onClickPrev} size="large">
          <LeftOutlined />
        </IconButton>
        <Typography variant="h5" color="textPrimary">
          {moment(date).format('MMMM yyyy')}
        </Typography>
        <IconButton onClick={onClickNext} size="large">
          {/* <IconChevronRight /> */}
          <RightOutlined />
        </IconButton>
      </Stack>
    </Grid>
    {/* <Grid item>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        {viewOptions.map((viewOption) => {
          const Icon = viewOption.icon;
          return (
            <Tooltip title={viewOption.label} key={viewOption.value}>
              <Button
                disableElevation
                variant={viewOption.value === view ? 'contained' : 'outlined'}
                onClick={() => onChangeView(viewOption.value)}
              >
                <Icon stroke="2" size="1.3rem" />
              </Button>
            </Tooltip>
          );
        })}
      </ButtonGroup>
    </Grid> */}
  </Grid>
);

Toolbar.propTypes = {
  date: PropTypes.object,
  view: PropTypes.string,
  onClickNext: PropTypes.func,
  onClickPrev: PropTypes.func,
  onClickToday: PropTypes.func,
  onChangeView: PropTypes.func,
};

export default Toolbar;
