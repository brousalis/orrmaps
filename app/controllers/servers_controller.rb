class ServersController < ApplicationController
  respond_to :json

  before_filter :valid_server?, :only => :show

  def create
    @server = find_server(params[:server])
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
    @server = find_server(name)
    @servers = servers
  end

  def rated
    server = params[:server] == "" ? session[:server] : params[:server]
    @server = find_server(server || "Jade Quarry")

    sorted = users_on_server(@server).collect do |user|
      [
        "<a href='/maps/#{user.map.id}'>#{user.name}</a>",
        points_for_map(user.map),
        time_ago(user.map.updated_at),
        (Time.now-user.map.updated_at).to_i,
        (user.map.updated_at < last_reset)
      ]
    end
    render :json => { "aaData" => sorted }
  end

  def points
    name = params[:name].titleize.sub("Of", "of")
    server = find_server(name)
    opacitys = [100,70,40,40,20]
    maps = server.maps.where("updated_at > ?", last_reset.to_s(:db)).includes(:points).limit(5)
    data = maps.zip(opacitys).collect do |map, opacity|
      {
        :opacity => 100,
        :points  => map.points.map(&:to_hash)
      }
    end
    render :json => { :data => data }
  end

private

  def opacity(map_id, top_map_id, second_map_id)
    if map_id == top_map_id
      100
    elsif map_id == second_map_id
      40
    else
      20
    end
  end

  def valid_server?
    @servers = servers
    name = params[:name].titleize.sub("Of", "of")
    render "404", :layout => "error" unless Server.find_by_name(name)
  end

end
