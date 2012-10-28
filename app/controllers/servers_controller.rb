class ServersController < ApplicationController
  include ApplicationHelper

  respond_to :json

  def create
    @server = Server.find_by_name(params[:server])
    session[:server] = @server.name
    if current_user
      @user = current_user
      @user.map.server = @server
      @user.map.save
      @user.server = @server
      @user.save
      current_user = @user
    end
    render :json => { "location" => "/" }
  end

  def show
    name = params[:name].titleize.sub("Of", "of")
    @server = Server.find_by_name(name)
    @servers = servers
  end

  def points
    name = params[:name].titleize.sub("Of", "of") 
    server = Server.find_by_name(name)
    data = server.maps.includes(:points).sort_by { |m| likes_for_map(m) || 0 }.reverse.collect do |map|
      {:likes => likes_for_map(map) || 0, :points => map.points.flatten.to_json}
    end
    render :json => data
  end
end
