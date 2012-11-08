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

  describe 'dislike' do
    it 'decrements the maps like count' do
      user  = User.create!(:name => 'foo',  :password => 'foo')
      user2 = User.create!(:name => 'foo2', :password => 'foo')
      map   = Map.create!(:user => user)
      @controller.stub(:current_user => user2)

      post 'dislike', :map_id => map.id

      json = JSON.parse(response.body)
      json['status'].should == 'success'
      json['count'].should  == '-1'
    end

    it 'removes the users previous dislike if one is already there' do
      user  = User.create!(:name => 'foo',  :password => 'foo')
      user2 = User.create!(:name => 'foo2', :password => 'foo')
      map   = Map.create!(:user => user)
      @controller.stub(:current_user => user2)

      post 'dislike', :map_id => map.id
      post 'dislike', :map_id => map.id

      json = JSON.parse(response.body)
      json['status'].should == 'success'
      json['count'].should  == '0'
    end
  end

  describe 'like' do
    it 'increments the maps like count' do
      user  = User.create!(:name => 'foo',  :password => 'foo')
      user2 = User.create!(:name => 'foo2', :password => 'foo')
      map   = Map.create!(:user => user)
      @controller.stub(:current_user => user2)

      post 'like', :map_id => map.id

      json = JSON.parse(response.body)
      json['status'].should == 'success'
      json['count'].should  == '1'
    end

    it 'removes the users previous like if one is already there' do
      user  = User.create!(:name => 'foo',  :password => 'foo')
      user2 = User.create!(:name => 'foo2', :password => 'foo')
      map   = Map.create!(:user => user)
      @controller.stub(:current_user => user2)

      post 'like', :map_id => map.id
      post 'like', :map_id => map.id

      json = JSON.parse(response.body)
      json['status'].should == 'success'
      json['count'].should  == '0'
    end
  end
end
