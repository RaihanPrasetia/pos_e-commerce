import { DraftType } from '@/type/darftTypes';
import { Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';

interface DraftListProp {
    draftData: DraftType[];
}

const formatDate = (dateString: string | Date): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";

    return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
};

const DraftList = ({ draftData }: DraftListProp) => {
    return (
        <Grid container spacing={2}>
            {draftData.length > 0 ? (
                draftData.map((draft) => (
                    <Grid item xs={12} sm={6} md={4} key={draft.id}>
                        <Card>
                            <CardActionArea>
                                <CardContent className='flex flex-col items-center space-y-2 bg-utama text-white'>
                                    <Typography variant="h6" fontWeight="bold">
                                        {draft.name}
                                    </Typography>
                                    <Typography variant="caption">
                                        {formatDate(draft.draftDt)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))
            ) : (
                <Typography variant="body2" color="textSecondary" className="text-center">
                    No draft data available
                </Typography>
            )}
        </Grid>
    );
};

export default DraftList;
