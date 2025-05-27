import React, { useState } from 'react';
import styled from 'styled-components';

const RechargeContainer = styled.div`
  padding: 20px;
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  background: #4a90e2;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #357abd;
  }
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 1.5rem;
`;

const PlanCard = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Recharge = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [operator, setOperator] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const operators = [
    'Jio',
    'Airtel',
    'Vodafone',
    'BSNL',
    'Sprint'
  ];

  const plans = [
    { amount: 20, validity: '28 days', data: '2GB', calls: 'Unlimited' },
    { amount: 50, validity: '28 days', data: '5GB', calls: 'Unlimited' },
    { amount: 100, validity: '84 days', data: '12GB', calls: 'Unlimited' },
    { amount: 200, validity: '365 days', data: '1.5GB/day', calls: 'Unlimited' }
  ];

  const handleRecharge = (e) => {
    e.preventDefault();
    if (!selectedPlan) {
      alert('Please select a plan');
      return;
    }
    // API call would go here
    console.log(`Recharging ${phoneNumber} with ${operator} for $${selectedPlan.amount}`);
    alert('Recharge successful!');
  };

  return (
    <RechargeContainer>
      <h1>Mobile Recharge</h1>

      <Card>
        <Form onSubmit={handleRecharge}>
          <Input
            type="tel"
            placeholder="Enter Mobile Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            pattern="[0-9]{10}"
            required
          />
          
          <Select 
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            required
          >
            <option value="">Select Operator</option>
            {operators.map(op => (
              <option key={op} value={op}>{op}</option>
            ))}
          </Select>
          
          {operator && (
            <>
              <h3>Select Plan</h3>
              <PlansGrid>
                {plans.map((plan, index) => (
                  <PlanCard
                    key={index}
                    onClick={() => setSelectedPlan(plan)}
                    style={{
                      border: selectedPlan === plan ? '2px solid #4a90e2' : 'none'
                    }}
                  >
                    <h3>${plan.amount}</h3>
                    <p>Validity: {plan.validity}</p>
                    <p>Data: {plan.data}</p>
                    <p>Calls: {plan.calls}</p>
                  </PlanCard>
                ))}
              </PlansGrid>
            </>
          )}
          
          <Button type="submit">Recharge Now</Button>
        </Form>
      </Card>
    </RechargeContainer>
  );
};

export default Recharge;