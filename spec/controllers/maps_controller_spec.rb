require 'spec_helper'

describe MapsController do
  describe 'index' do
    it 'returns no points if there is no current user' do
      get 'index'
      JSON.parse(response.body)['points'].should == []
    end

    it 'returns the current users map and points' do
      user = User.create!(:name => 'foo', :password => 'foo')
      map  = Map.create!(:user => user)
      point = Point.create!(:map => map, :latitude => 70, :longitude => 70, :marker_id => "70,70")
      @controller.stub(:current_user => user)

      get 'index'

      json = JSON.parse(response.body)
      json['map_id'].should                    == map.id
      json['points'].first['latitude'].should  == 70
      json['points'].first['longitude'].should == 70
      json['points'].first['marker_id'].should == '70,70'
    end
  end
end
