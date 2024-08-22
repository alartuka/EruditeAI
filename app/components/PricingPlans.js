"use client";

import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const PricingPlans = ({ onSelectPlan }) => {
  const plans = [
    { name: 'Free', price: 0, limit: 3, generationsPerMonth: 30 },
    { name: 'Basic', price: 5, limit: 10, generationsPerMonth: 100 },
    { name: 'Pro', price: 20, limit: 50, generationsPerMonth: 500 },
  ];

  return (
    <Grid container spacing={3} justifyContent="center">
      {plans.map((plan) => (
        <Grid item xs={12} sm={4} key={plan.name}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {plan.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                ${plan.price}/month
              </Typography>
              <Typography variant="body2" paragraph>
                Generate up to {plan.limit} cards at a time
              </Typography>
              <Typography variant="body2" paragraph>
                {plan.generationsPerMonth} generations per month
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onSelectPlan(plan)}
                sx={{ mt: 2 }}
              >
                {plan.price === 0 ? 'Start Free' : 'Subscribe'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PricingPlans;