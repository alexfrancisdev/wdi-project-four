/* global describe,it */
import React from 'react';
import axios from 'axios';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import TourIndex from '../../../src/components/tours/Index';

const userIds = [
  '5be9860fcb16d525543ceda3',
  '5be9860fcb16d525543ceda4',
  '5be9860fcb16d525543ceda5',
  '5be9860fcb16d525543ceda6'
];

const buildingIds = [
  '5c0968f5dc8e460b1e53f07b',
  '5c0968f8dc8e460b1e53f07c',
  '5c0968f9dc8e460b1e53f07d'
];

const testData = [{
  name: 'London Tour',
  description: 'A short tour around central London',
  buildings: [buildingIds[0], buildingIds[1], buildingIds[2], buildingIds[3]],
  createdBy: userIds[3]
}];

sinon.stub(axios, 'get')
  .returns(Promise.resolve({ data: testData }));

describe('Bag Index', () => {
  it('should show the correct number of tours', done => {
    const component = shallow(<TourIndex />);
    component.setState({ filteredTours: testData });
    expect(component.state()).to.have.property('filteredTours');
    expect(component.find('TourBox').length).to.eq(testData.length);
    done();
  });
  it('should have the correct createdBy username in each TourBox', done => {
    const component = shallow(<TourIndex />);
    component.setState({ filteredTours: testData });
    component.find('TourBox').forEach((filteredTour, i) => {
      expect(filteredTour.props().filteredTour.createdBy.username).to.eq(testData[i].createdBy.username);
    });
    done();
  });
});
