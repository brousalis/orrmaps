class HomeController < ApplicationController
  before_filter :default_server

  def index
    @user = User.new unless current_user
    @map = Map.new unless current_user
    @rated = Map.all.collect{|m|{:map=>m,:count=>m.likes.count}}.sort{|a,b| b[:count] <=> a[:count]}
    server = Server.find_by_name(session[:server])

    if current_user
      if !current_user.map
        map = Map.new(:user => current_user, :server => server)
        user = current_user
        map.save
        user.map = map
        user.save
        @map = map
      end
      @map = current_user.map
    end
  end

  def default_server
    session[:server] = current_user.server.name if current_user
    session[:server] ||= "Borlis Pass" unless current_user
    @server = session[:server]
  end
end
