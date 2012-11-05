class ServersController < ApplicationController
  respond_to :json

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
    @server = find_server(session[:server] || "Jade Quarry")

    sorted = users_on_server(@server).collect do |user|
      [
        "<a href='/maps/#{user.map.id}'>#{user.name}</a>",
        points_for_map(user.map),
        likes_for_map(user.map),
        (Time.now-user.map.updated_at).to_i,
        time_ago(user.map.updated_at)
      ]
    end
    render :json => { "aaData" => sorted }
  end

  def points
    name = params[:name].titleize.sub("Of", "of")
    server = find_server(name)

    data = server.maps.includes(:points).sort_by { |m| likes_for_map(m) || 0 }.reverse.collect do |map|
      {:likes => likes_for_map(map) || 0, :points => map.points.flatten.to_json}
    end
    render :json => data
  end
end
