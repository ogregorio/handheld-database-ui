import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { RankingDetailsT } from '../../types/RankingDetailsT';
import RankingDetails from '../../components/RankingDetails';
import { PlatformIndex } from '../../types/PlatformT';
import Card from '../../components/Cards/Card';
import HandheldDatabaseService from '../../services/HandheldDatabaseService';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [platforms, setPlatforms] = useState<PlatformIndex[]>([]);
  const [ranks] = useState<RankingDetailsT[]>([
    {
      name: 'PLATINUM',
      color: 'rgb(180, 199, 220)',
      graphics: 'Outstanding, with no glitches or visual issues and exceptional detail.',
      gameplay: 'Extremely stable, with very high FPS (60 or higher) and absolutely no drops or stuttering.',
      load: 'Instantaneous loading, completely free of crashes or any issues affecting user experience.',
    },
    {
      name: 'GOLD',
      color: 'rgb(207, 181, 59)',
      graphics: 'Excellent, without significant glitches or visual issues.',
      gameplay: 'Very stable, with a high FPS rate (30 or higher) and no noticeable drops or stuttering.',
      load: 'Quick loading, no crashes, or issues that affect the user experience.',
    },
    {
      name: 'SILVER',
      color: 'rgb(166, 166, 166)',
      graphics: 'Good, with some minor glitches that do not significantly affect the gaming experience.',
      gameplay: 'Stable most of the time, with occasional minor FPS drops or stuttering.',
      load: 'Relatively quick loading, with few slowdowns or minor issues that can be worked around.',
    },
    {
      name: 'BRONZE',
      color: 'rgb(205, 127, 50)',
      graphics: 'Acceptable, but with noticeable visual glitches that can affect the gaming experience.',
      gameplay: 'Inconsistent, with more frequent and noticeable FPS drops and occasional stuttering.',
      load: 'Slow loading, with the possibility of crashes or issues that affect usability.',
    },
    {
      name: 'FAULTY',
      color: 'red',
      graphics: 'Poor, with severe glitches and visual issues that hinder gameplay.',
      gameplay: 'Very unstable, with constant FPS drops and severe stuttering, compromising playability.',
      load: 'Significant loading problems, including frequent crashes and glitches that impede proper use.',
    },
  ]);

  useEffect(() => {
    setIsLoading(true);

    const didMount = async () => {
      const platforms = await HandheldDatabaseService.fetchPlatformsIndex()
      setPlatforms(platforms);
      setIsLoading(false);
    }

    didMount();

    return () => {}
  }, []);

  return (
    <Container className="mt-4 page-content">

      <Row>
        <Col lg={12}>
          <div className="main-banner text-light">
            <Row>
              <Col lg={7}>
                <div className="header-text">
                  <h6>Welcome To Handheld Database</h6>
                  <h4>
                    <em>Ranking</em> the Best (and Worst) Games!
                  </h4>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row className="mt-5 gallery-section">
        <Col lg={12}>
          <div className='heading-section'>
            <h4>
              <em>Available</em> Platforms
            </h4>
          </div>
          <Row id="platforms">
            {platforms.map((platform: PlatformIndex, i: number) => (
              <Col lg={3} sm={6} key={platform.database_key}>
                <Card 
                  image={`https://handheld-database.github.io/handheld-database/commons/images/${platform.image}`}
                  link={`/platforms/${platform.database_key}`}
                  title={platform.name}
                  subtitle={platform.system}
                  isLoading={isLoading}
                  key={i}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Row className="mt-5 gallery-section">
        <Col lg={12}>
          <div className='heading-section'>
            <h4>
              How the <em>Ranking</em> Works
            </h4>
          </div>
          <Row id="ranks">
            <RankingDetails ranks={ranks} />
          </Row>
        </Col>
      </Row>

    </Container>
  );
};

export default HomePage;
