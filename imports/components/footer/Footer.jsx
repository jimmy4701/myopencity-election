import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data'
import { Grid, Container, Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { Partners } from '/imports/api/partners/partners'

class Footer extends Component {
    render() {
        const { footer_background_color, footer_color, footer_cgu_display, cgu_term, footer_height, footer_content } = Meteor.isClient && Session.get('global_configuration')
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 10,
            slidesToScroll: 10,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                  }
                }
              ]
        }
        return (
            <Grid stackable className="footer" verticalAlign="middle" style={{ backgroundColor: footer_background_color, color: footer_color, height: footer_height }}>
                <Grid.Column width={16}>
                  <Container>
                    <Header as="h2" style={{textAlign: "center", color: "white"}}>PARTENAIRES</Header>
                    <Slider {...settings}>
                      {this.props.partners.map(partner =>
                          <div>
                            <Image
                                circular
                                size="tiny"
                                src={partner.image_url}
                                href={partner.link}
                                target="_blank"
                            />
                          </div>
                      )}
                    </Slider>
                  </Container>
                </Grid.Column>    
                <Grid.Column width={16}>
                    <Container>
                        <span className="left-align">{footer_content}</span>
                        {footer_cgu_display && <Link to='/conditions' className="pointer" style={{float: 'right'}}><span>{cgu_term}</span></Link>}
                    </Container>
                </Grid.Column>
            </Grid>
        );
    }
}

export default withTracker(()=>{
  const partnersPublication = Meteor.isClient && Meteor.subscribe('partners.all')
  const loading = Meteor.isClient && !partnersPublication.ready()
  const partners = Partners.find({}).fetch()   
  return {
    loading,
    partners      
  }
})(Footer)