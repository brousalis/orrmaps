class HomeController < ApplicationController
  before_filter :set_server

  def index
    @user = User.new unless current_user
  end

  def set_server
    session[:server] ||= "Borlis Pass"
    @server = session[:server]
  end
end
